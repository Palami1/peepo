function calculateAndAlert() {
    // 1. ດຶງຄ່າຈາກ Input
    let inputElementOld = document.getElementById('inputNumber');
    let old_reading = parseFloat(inputElementOld.value);
    
    let inputElementNew = document.getElementById('inputNumber1');
    let new_reading = parseFloat(inputElementNew.value);

    // 2. ຄິດໄລ່ຫົວໜ່ວຍທີ່ໃຊ້
    let unitsUsed = new_reading - old_reading;
    let totalCost = 0; 
    let remainingUnits = unitsUsed;

    // 3. ກວດສອບຄວາມຖືກຕ້ອງຂອງຂໍ້ມູນ
    if (isNaN(unitsUsed) || unitsUsed < 0) {
        document.getElementById('unitsUsedDisplay').innerText = "ຂໍ້ມູນບໍ່ຖືກຕ້ອງ!";
        document.getElementById('baseCostDisplay').innerText = "0";
        document.getElementById('vatDisplay').innerText = "0";
        document.getElementById('finalDisplay').innerText = "0";
        alert("ກະລຸນາປ້ອນຕົວເລກໃຫ້ຖືກຕ້ອງ (ເລກໃໝ່ຕ້ອງຫຼາຍກວ່າເລກເກົ່າ)");
        return;
    }

    // 4. ການຄິດໄລ່ລາຄາແຍກຕາມແຕ່ລະຊັ້ນ (Tiers)
    // Tier 1: 0 - 25 @ 679
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 25);
        totalCost += unitsInTier * 679;
        remainingUnits -= unitsInTier;
    } 

    // Tier 2: 26 - 150 @ 756
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 125);
        totalCost += unitsInTier * 756;
        remainingUnits -= unitsInTier;
    }
    
    // Tier 3: 151 - 300 @ 1207
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 150);
        totalCost += unitsInTier * 1207;
        remainingUnits -= unitsInTier;
    }

    // Tier 4: 301 - 400 @ 1303
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 100);
        totalCost += unitsInTier * 1303;
        remainingUnits -= unitsInTier;
    }

    // Tier 5: 401 - 500 @ 1402
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 100);
        totalCost += unitsInTier * 1402;
        remainingUnits -= unitsInTier;
    }

    // Tier 6: 501 - 1000 @ 1442
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 500);
        totalCost += unitsInTier * 1442;
        remainingUnits -= unitsInTier;
    }
    
    // Tier 7: 1001 - 1500 @ 1500
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 500);
        totalCost += unitsInTier * 1500;
        remainingUnits -= unitsInTier;
    }

    // Tier 8: >= 1501 @ 1562
    if (remainingUnits > 0) {
        totalCost += remainingUnits * 1562;
    }

    // 5. ເພີ່ມຄ່າບໍລິການຄົງທີ່ ແລະ ຄິດໄລ່ VAT
    const SERVICE_CHARGE = 17700;
    totalCost += SERVICE_CHARGE;

    const VAT_RATE = 0.10; // 10%
    let vatAmount = totalCost * VAT_RATE;
    let finalAmountDue = totalCost + vatAmount;

    // 6. ຈັດຮູບແບບຕົວເລກໃຫ້ມີຈຸດຂັ້ນ (Formatting)
    let formattedUnits = unitsUsed.toLocaleString();
    let formattedBaseCost = Math.floor(totalCost).toLocaleString();
    let formattedVat = Math.floor(vatAmount).toLocaleString();
    let formattedFinal = Math.floor(finalAmountDue).toLocaleString();

    // 7. ສະແດງຜົນອອກທາງໜ້າເວັບ (Display)
    document.getElementById('unitsUsedDisplay').innerText = formattedUnits;
    document.getElementById('baseCostDisplay').innerText = formattedBaseCost;
    document.getElementById('vatDisplay').innerText = formattedVat;
    document.getElementById('finalDisplay').innerText = formattedFinal;
}