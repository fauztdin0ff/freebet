/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", () => {
   const checkboxes = document.querySelectorAll('.bookmaker input[type="checkbox"]');
   const btnPick = document.querySelector('.freebet__button .btn');
   const btnNone = document.querySelector('.freebet__bookmakers-button');
   const step1 = document.querySelector('.freebet__step-1');
   const step2 = document.querySelector('.freebet__step-2');
   const wincardBc = document.querySelector('.freebet__wincard-bc');
   const wincardLink = document.querySelector('.freebet__wincard-link a');
   const items = document.querySelectorAll('.freebet__items .freebet__item');
   const freebetBody = document.querySelector('.freebet__body'); // контейнер

   function getAllBookmakers() {
      return Array.from(items).map(item => item.dataset.bc);
   }

   function getSelection() {
      let selected = [];
      checkboxes.forEach(cb => {
         if (cb.checked) selected.push(cb.value);
      });
      return selected;
   }

   function showFreebets(selection) {
      let all = getAllBookmakers();
      let filtered = all.filter(bc => !selection.includes(bc));
      let top4 = filtered.slice(0, 4);

      items.forEach(item => item.style.display = "none");

      if (top4.length > 0) {
         const winItem = document.querySelector(`.freebet__item[data-bc="${top4[0]}"]`);
         if (winItem) {
            wincardBc.textContent = winItem.querySelector('.freebet__item-bc').textContent.trim();
            wincardLink.href = winItem.querySelector('a').href;
         }

         top4.slice(1).forEach(bc => {
            const smallItem = document.querySelector(`.freebet__item[data-bc="${bc}"]`);
            if (smallItem) smallItem.style.display = "flex";
         });
      }

      step1.style.display = "none";
      step2.style.display = "flex";
   }

   function handleShow(selection) {
      freebetBody.classList.add("loading");

      setTimeout(() => {
         freebetBody.classList.remove("loading");
         showFreebets(selection);

         window.scrollTo({
            top: 0,
            behavior: "smooth"
         });
      }, 1000);
   }


   btnPick.addEventListener("click", () => {
      let selected = getSelection();
      handleShow(selected);
   });

   btnNone.addEventListener("click", () => {
      handleShow([]);
   });
});

/******/ })()
;