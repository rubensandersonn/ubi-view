const updateMoneyOnLocalStorage = () => {
  setLocalStorageData("@money", JSON.stringify({ money: money }))
    .then(res => {
      console.log("salvou money?", res);
    })
    .catch(err => console.log(err));
};

const updateBillsOnLocalStorage = () => {
  setLocalStorageData("@bills", JSON.stringify({ bills: bills }))
    .then(res => {
      console.log("salvou bill?", res);
    })
    .catch(err => console.log(err));
};

// === retrieving data from local storage ===
useEffect(() => {
  // === getting bills ===
  getLocalStorageData("@bills")
    .then(Bills => {
      if (Bills) {
        setBills(JSON.parse(Bills).bills);
      } else {
        setBills(null);
      }
    })
    .catch(err => {
      console.log(err);
      setBills(null);
    });

  // === getting money value ===

  getLocalStorageData("@money")
    .then(Money => {
      if (Money) {
        setMoney(JSON.parse(Money).money);
      } else {
        setMoney(0);
      }
    })
    .catch(err => {
      console.log(err);
      setMoney(0);
    });
}, []);
