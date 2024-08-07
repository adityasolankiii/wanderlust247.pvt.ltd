// Children Stepper
const childrenInput = document.getElementById("children");
const decChild = document.getElementById("decChild");
const incChild = document.getElementById("incChild");

let minChildren = 0;
let maxChildren = 2;
let currentChildren = parseInt(childrenInput.value);

decChild.addEventListener("click", function () {
  if (currentChildren > minChildren) {
    currentChildren -= 1;
    childrenInput.value = currentChildren;
  }
});

incChild.addEventListener("click", function () {
  if (currentChildren < maxChildren) {
    currentChildren += 1;
    childrenInput.value = currentChildren;
  }
});

// Adults Stepper
const adultsInput = document.getElementById("adult");
const decAdults = document.getElementById("decAdult");
const incAdults = document.getElementById("incAdult");

const minAdults = 1;
const maxAdults = 4;
let currentAdults = parseInt(adultsInput.value);

decAdults.addEventListener("click", function () {
  if (currentAdults > minAdults) {
    currentAdults -= 1;
    adultsInput.value = currentAdults;
  }
});

incAdults.addEventListener("click", function () {
  if (currentAdults < maxAdults) {
    currentAdults += 1;
    adultsInput.value = currentAdults;
  }
});

// Form Validations
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

document.addEventListener("DOMContentLoaded", function () {
  let totalPriceElement = document.getElementById("totalPrice");

  checkin.addEventListener("change", updateTotalPrice);
  checkout.addEventListener("change", updateTotalPrice);

  function updateTotalPrice() {
    const hidden = document.getElementById("hidden");

    let checkinDate = new Date(checkin.value);
    let checkoutDate = new Date(checkout.value);

    let timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let totalPrice = diffDays * pricePerNight;
    hidden.value = totalPrice;
    totalPriceElement.textContent = totalPrice.toLocaleString("en-IN");
  }
});

//Checkin and Checkout Calanders
// Get dates
const today = new Date();

const tdyear = today.getFullYear();
const tdmonth = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const tdday = String(today.getDate()).padStart(2, "0");
const todayDate = `${tdyear}-${tdmonth}-${tdday}`;

const tmyear = today.getFullYear();
const tmmonth = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const tmday = String(today.getDate() + 1).padStart(2, "0");
const tomorrowDate = `${tmyear}-${tmmonth}-${tmday}`;

// Set min for checkin and checkout dates
checkin.setAttribute("min", todayDate);
checkout.setAttribute("min", tomorrowDate);

checkin.addEventListener("change", updateDate);
checkout.addEventListener("change", updateDate);

function updateDate() {
  let checkinDate = new Date(checkin.value);
  let checkoutDate = new Date(checkout.value);

  let pDate = new Date(checkoutDate);
  pDate.setDate(pDate.getDate() - 1);
  const pyear = pDate.getFullYear();
  const pmonth = String(pDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const pday = String(pDate.getDate()).padStart(2, "0");
  const prevDate = `${pyear}-${pmonth}-${pday}`;

  let nDate = new Date(checkinDate);
  nDate.setDate(nDate.getDate() + 1);
  const nyear = nDate.getFullYear();
  const nmonth = String(nDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const nday = String(nDate.getDate()).padStart(2, "0");
  const nextDate = `${nyear}-${nmonth}-${nday}`;

  console.log(prevDate, "|", nextDate);

  checkout.setAttribute("min", nextDate);
  checkin.setAttribute("max", prevDate);
}

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelector(".reserve-form");
  // const aadhar = document.getElementById("aadhar");
  const mobile = document.getElementById("mobile");

  // Validate Aadhar number
  // aadhar.addEventListener("input", function () {
  //   const aadharValue = aadhar.value;
  //   const aadharPattern = /^\d{12}$/; // 12-digit pattern
  //   if (!aadharPattern.test(aadharValue)) {
  //     aadhar.setCustomValidity("must be valid Aadhar number");
  //   } else {
  //     aadhar.setCustomValidity("");
  //   }
  // });

  // Validate Mobile number
  mobile.addEventListener("input", function () {
    const mobileValue = mobile.value;
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(mobileValue)) {
      mobile.setCustomValidity("must be a valid Indian Mobile number");
    } else {
      mobile.setCustomValidity("");
    }
  });

  // Loop over them and prevent submission
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
})();
