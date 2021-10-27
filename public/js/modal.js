function modalmania(e){
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById(m_ID).classList.add('open');
            document.querySelector(`.setting-host`).focus(); /* hack to focus on the first input of settings modal */
            // e.preventDefault();
        }
    }

    // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        e.preventDefault();
    }
}

document.addEventListener('keypress', function (e) {
  modalmania(e)
}, false);

document.addEventListener('click', function (e) {
  modalmania(e)
}, false);


/*
 * Author: Fatima Aurelia
 * Date: 01/22/2017
 * Version: 1.0
 * updated 7/22/2020 to listen for click + keyboard
 * version 1.0.1
*/
