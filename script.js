// Javascript code
const pageTriggers = document.querySelectorAll('.nav-item, .feature-container, .assets-feature, .menu-item, .back-button');
const pageContents = document.querySelectorAll('.page-content');
const navItems = document.querySelectorAll('.bottom-nav .nav-item');
// Account Management Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Account Management page functionality
    initAccountManagement();
});

function initAccountManagement() {
    // Only proceed if we're on the account management page
    if (!document.getElementById('account-management-page')) return;
    
    // Edit buttons for profile fields
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputField = this.previousElementSibling;
            
            if (inputField.readOnly) {
                // Enable editing
                inputField.readOnly = false;
                inputField.focus();
                this.textContent = 'Save';
                inputField.style.backgroundColor = '#2a2a2a';
                inputField.style.borderColor = '#1e90ff';
            } else {
                // Save changes
                inputField.readOnly = true;
                this.textContent = 'Edit';
                inputField.style.backgroundColor = '#1a1a1a';
                inputField.style.borderColor = '#333';
                
                // Show confirmation
                showNotification('Changes saved successfully!');
            }
        });
    });
    
    // Change buttons (password, etc)
    const changeButtons = document.querySelectorAll('.change-btn');
    changeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionName = this.previousElementSibling.querySelector('.option-name').textContent;
            showModal(`Change ${optionName}`, 'This functionality will be implemented soon.');
        });
    });
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const featureName = this.closest('.security-option').querySelector('.option-name').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            showNotification(`${featureName} ${status} successfully!`);
        });
    });
    
    // Verification button
    const verifyButton = document.querySelector('.verify-now-btn');
    if (verifyButton) {
        verifyButton.addEventListener('click', function() {
            showModal('Advanced Verification', 'Start the verification process to increase your account limits.');
        });
    }
    
    // Preference option buttons
    const preferenceButtons = document.querySelectorAll('.option-btn');
    preferenceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionName = this.previousElementSibling.querySelector('.option-name').textContent;
            showModal(`Manage ${optionName}`, 'This functionality will be implemented soon.');
        });
    });
    
    // Connect/Disconnect account buttons
    const accountActionButtons = document.querySelectorAll('.connect-btn, .disconnect-btn');
    accountActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platformName = this.previousElementSibling.querySelector('.platform-name').textContent;
            const action = this.classList.contains('connect-btn') ? 'connect to' : 'disconnect from';
            
            showModal(`${action.charAt(0).toUpperCase() + action.slice(1)} ${platformName}`, `Are you sure you want to ${action} ${platformName}?`);
        });
    });
    
    // View all activity button
    const viewAllButton = document.querySelector('.view-all-btn');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            showModal('Account Activity', 'Full activity history will be implemented soon.');
        });
    }
    
    // Danger zone buttons
    const dangerButtons = document.querySelectorAll('.freeze-btn, .close-btn');
    dangerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('freeze-btn') ? 'freeze' : 'close';
            const actionTitle = action.charAt(0).toUpperCase() + action.slice(1);
            
            showModal(`${actionTitle} Account`, `Are you sure you want to ${action} your account? This action ${action === 'freeze' ? 'can' : 'cannot'} be undone.`, true);
        });
    });
    
    // Change avatar button
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            showModal('Change Profile Picture', 'Upload a new profile picture or choose from our avatars.');
        });
    }
}

// Utility Functions

// Show notification toast
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        // Create notification container if it doesn't exist
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.left = '50%';
        notificationContainer.style.transform = 'translateX(-50%)';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.backgroundColor = '#1e90ff';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.margin = '10px 0';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}

// Show a modal dialog
function showModal(title, message, isDanger = false) {
    // Remove existing modal if any
    const existingModal = document.getElementById('account-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.id = 'account-modal';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '1001';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = '#242424';
    modalContent.style.borderRadius = '12px';
    modalContent.style.padding = '20px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.width = '350px';
    modalContent.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.marginBottom = '15px';
    
    // Create title
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = title;
    modalTitle.style.color = isDanger ? '#ff4d4d' : '#fff';
    modalTitle.style.margin = '0';
    modalTitle.style.fontSize = '18px';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#888';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0 5px';
    closeButton.onclick = function() {
        document.body.removeChild(modalContainer);
    };
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.style.marginBottom = '20px';
    
    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalMessage.style.color = '#ccc';
    modalMessage.style.fontSize = '14px';
    modalMessage.style.lineHeight = '1.5';
    
    modalBody.appendChild(modalMessage);
    
    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.style.display = 'flex';
    modalFooter.style.justifyContent = 'flex-end';
    modalFooter.style.gap = '10px';
    
    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.backgroundColor = 'transparent';
    cancelButton.style.border = '1px solid #666';
    cancelButton.style.color = '#888';
    cancelButton.style.padding = '8px 15px';
    cancelButton.style.borderRadius = '20px';
    cancelButton.style.fontSize = '14px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.onclick = function() {
        document.body.removeChild(modalContainer);
    };
    
    // Confirm button
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.style.backgroundColor = isDanger ? '#ff4d4d' : '#1e90ff';
    confirmButton.style.border = 'none';
    confirmButton.style.color = '#fff';
    confirmButton.style.padding = '8px 15px';
    confirmButton.style.borderRadius = '20px';
    confirmButton.style.fontSize = '14px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.onclick = function() {
        document.body.removeChild(modalContainer);
        showNotification(`Action ${isDanger ? 'cancelled for security reasons' : 'confirmed'}`);
    };
    
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(confirmButton);
    
    // Assemble modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    
    modalContainer.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(modalContainer);
    
    // Add animation
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    modalContent.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
    
    // Close when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            document.body.removeChild(modalContainer);
        }
    });
}
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

// Debit Card Page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Back button for debit card page
    const debitBackButton = document.querySelector('.debit-card-back-arrow');
    if (debitBackButton) {
        debitBackButton.addEventListener('click', function() {
            showPage('assets-page');
        });
    }

    // Action buttons
    document.querySelectorAll('.debit-action-button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            console.log(`${action} clicked`);
            
            // Add functionality based on button clicked
            if (action === 'recharger') {
                showPage('recharge-page');
            } else if (action === 'withdraw') {
                showPage('withdraw-page');
            } else if (action === 'transfer') {
                showPage('vip-transfer-page');
            }
        });
    });
});
// Recharge Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Recharge page functionality
    initRechargePage();
});

function initRechargePage() {
    // Only proceed if we're on the recharge page
    if (!document.getElementById('recharge-page')) return;
    
    // Tab Switching
    const rechargeTabs = document.querySelectorAll('.recharge-tab');
    const rechargeContents = document.querySelectorAll('.recharge-content');
    
    rechargeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            rechargeTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            rechargeContents.forEach(content => content.classList.remove('active'));
            
            // Show the relevant content section
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Crypto Tab Functionality
    setupCryptoTab();
    
    // Bank Transfer Tab Functionality
    setupBankTransferTab();
    
    // Credit Card Tab Functionality
    setupCreditCardTab();
}

function setupCryptoTab() {
    // Currency and Network selectors
    const currencySelect = document.getElementById('crypto-currency');
    const networkSelect = document.getElementById('crypto-network');
    
    if (!currencySelect || !networkSelect) return;
    
    // Update wallet address and QR code when currency or network changes
    currencySelect.addEventListener('change', updateWalletAddress);
    networkSelect.addEventListener('change', updateWalletAddress);
    
    // Copy button functionality
    const copyAddressBtn = document.querySelector('.copy-address-btn');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', function() {
            const walletAddress = document.querySelector('.wallet-address').textContent;
            copyToClipboard(walletAddress, 'Address copied to clipboard!');
        });
    }
    
    // Initial update
    updateWalletAddress();
}

function updateWalletAddress() {
    const currency = document.getElementById('crypto-currency').value;
    const network = document.getElementById('crypto-network').value;
    
    // Generate a fake address based on currency and network
    let walletAddress = '';
    
    switch(currency) {
        case 'BTC':
            walletAddress = network === 'TRC20' 
                ? 'TCZxzMbQB6uymRy8PzJ9JZJ82GYiLs1Byp' 
                : '0x3F9D5bBa9fCD1CBf3908d5D20C65f3EbD936Ec5A';
            break;
        case 'ETH':
            walletAddress = network === 'TRC20' 
                ? 'TLwoxmKRMrqhgMfXCo5HMR1fHZ7YP3jFXh' 
                : '0x89D24A7b4cCB1b6fAA2625Fe562bDd1a23D3313';
            break;
        case 'USDT':
            walletAddress = network === 'TRC20' 
                ? 'TUV3Su5iRbcyQpB4nYrpjNxTGnG57C5xVp' 
                : '0x1F98431c8aD98523631AE4a59f267346ea31F984';
            break;
        case 'BNB':
            walletAddress = network === 'BEP20' 
                ? 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23' 
                : '0x2170Ed0880ac9A755fd29B2688956BD959F933F8';
            break;
        case 'SOL':
            walletAddress = 'DRpbCBMxVnDK7maPM1tRQ8oRQ7qMUmMhf56wGKZZpWxV';
            break;
        default:
            walletAddress = 'TUV3Su5iRbcyQpB4nYrpjNxTGnG57C5xVp';
    }
    
    // Update wallet address display
    const walletAddressElement = document.querySelector('.wallet-address');
    if (walletAddressElement) {
        walletAddressElement.textContent = walletAddress;
    }
    
    // Update QR code (simplified for this example)
    const qrLogo = document.querySelector('.qr-svg text');
    if (qrLogo) {
        // Update the QR code logo based on currency
        switch(currency) {
            case 'BTC':
                qrLogo.textContent = '₿';
                break;
            case 'ETH':
                qrLogo.textContent = 'Ξ';
                break;
            case 'USDT':
                qrLogo.textContent = '₮';
                break;
            case 'BNB':
                qrLogo.textContent = 'B';
                break;
            case 'SOL':
                qrLogo.textContent = 'S';
                break;
        }
    }
    
    // Update instructions
    const instructionList = document.querySelectorAll('.instruction-list li');
    if (instructionList.length > 0) {
        instructionList[0].innerHTML = `Send only <span class="highlight">${currency}</span> to this deposit address`;
        instructionList[1].innerHTML = `Ensure you've selected the correct network (<span class="highlight">${network}</span>)`;
    }
}

function setupBankTransferTab() {
    // Copy buttons for bank details
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.previousElementSibling.textContent;
            copyToClipboard(textToCopy, 'Copied to clipboard!');
        });
    });
    
    // File upload button
    const uploadBtn = document.querySelector('.upload-btn');
    const fileNameElement = document.querySelector('.file-name');
    
    if (uploadBtn && fileNameElement) {
        uploadBtn.addEventListener('click', function() {
            // Simulate file upload dialog
            showNotification('File upload simulation: Receipt uploaded', 'success');
            fileNameElement.textContent = 'receipt.jpg';
        });
    }
    
    // Bank transfer form submission
    const notifyForm = document.querySelector('.notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values (simplified for this example)
            const amount = document.getElementById('transfer-amount').value;
            
            showNotification(`Bank transfer notification submitted successfully. Amount: $${amount}`, 'success');
        });
    }
}

function setupCreditCardTab() {
    // Amount buttons
    const amountButtons = document.querySelectorAll('.amount-btn');
    const cardAmountInput = document.getElementById('card-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the amount input value
            const amount = this.getAttribute('data-amount');
            if (cardAmountInput) {
                cardAmountInput.value = amount;
                updatePaymentSummary(amount);
            }
        });
    });
    
    // Update summary when amount changes
    if (cardAmountInput) {
        cardAmountInput.addEventListener('input', function() {
            updatePaymentSummary(this.value);
            
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to matching button if any
            amountButtons.forEach(btn => {
                if (btn.getAttribute('data-amount') === this.value) {
                    btn.classList.add('active');
                }
            });
        });
    }
    
    // Format card number with spaces
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            
            if (value.length > 16) {
                value = value.substr(0, 16);
            }
            
            // Add spaces after every 4 digits
            const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            this.value = formattedValue;
        });
    }
    
    // Format expiry date (MM/YY)
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 4) {
                value = value.substr(0, 4);
            }
            
            // Format as MM/YY
            if (value.length > 2) {
                this.value = value.substring(0, 2) + '/' + value.substring(2);
            } else {
                this.value = value;
            }
        });
    }
    
    // Only allow numbers in CVV
    const cvvInput = document.getElementById('card-cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '').substr(0, 3);
        });
    }
    
    // Card payment form submission
    const cardPaymentForm = document.querySelector('.card-payment-form');
    
    if (cardPaymentForm) {
        cardPaymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values (simplified for this example)
            const amount = document.getElementById('card-amount').value;
            
            if (!amount || parseFloat(amount) <= 0) {
                showNotification('Please enter a valid amount', 'error');
                return;
            }
            
            showNotification(`Card payment of $${amount} processed successfully`, 'success');
        });
    }
    
    // Initial update
    updatePaymentSummary(0);
}

function updatePaymentSummary(amount) {
    amount = parseFloat(amount) || 0;
    const fee = amount * 0.03; // 3% fee
    const total = amount + fee;
    
    // Update summary values
    document.getElementById('summary-amount').textContent = `$${amount.toFixed(2)}`;
    document.getElementById('summary-fee').textContent = `$${fee.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

// Helper function to copy text to clipboard
function copyToClipboard(text, notificationMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification(notificationMessage, 'success');
    } catch (err) {
        showNotification('Failed to copy text', 'error');
        console.error('Failed to copy: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        // Create notification container if it doesn't exist
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.left = '50%';
        notificationContainer.style.transform = 'translateX(-50%)';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set styles based on notification type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#1e90ff';
    }
    
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.margin = '10px 0';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.maxWidth = '90%';
    notification.style.wordBreak = 'break-word';
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}
// Financial Records Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Financial Records page functionality
    initFinancialRecordsPage();
});

function initFinancialRecordsPage() {
    // Only proceed if we're on the financial records page
    if (!document.getElementById('financial-records-page')) return;
    
    // Set up date pickers with default values (current month)
    setupDateFilters();
    
    // Set up filter functionality
    setupFilters();
    
    // Set up transaction details modal
    setupTransactionModal();
    
    // Set up pagination
    setupPagination();
    
    // Set up export functionality
    setupExportButton();
    
    // Set up search functionality
    setupSearch();
}

function setupDateFilters() {
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    
    if (!dateFromInput || !dateToInput) return;
    
    // Set default date range to current month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Format dates as YYYY-MM-DD for the date inputs
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    dateFromInput.value = formatDate(firstDayOfMonth);
    dateToInput.value = formatDate(today);
    
    // Add event listeners to update filters when dates change
    dateFromInput.addEventListener('change', function() {
        // Ensure that 'from' date is not after 'to' date
        if (dateFromInput.value > dateToInput.value) {
            dateToInput.value = dateFromInput.value;
        }
    });
    
    dateToInput.addEventListener('change', function() {
        // Ensure that 'to' date is not before 'from' date
        if (dateToInput.value < dateFromInput.value) {
            dateFromInput.value = dateToInput.value;
        }
    });
}

function setupFilters() {
    const filterApplyBtn = document.querySelector('.filter-apply-btn');
    
    if (!filterApplyBtn) return;
    
    filterApplyBtn.addEventListener('click', function() {
        // Get filter values
        const transactionType = document.getElementById('transaction-type').value;
        const transactionStatus = document.getElementById('transaction-status').value;
        const transactionCurrency = document.getElementById('transaction-currency').value;
        const dateFrom = document.getElementById('date-from').value;
        const dateTo = document.getElementById('date-to').value;
        
        // For this demo, just show a notification that filters were applied
        showNotification(`Filters applied: Type=${transactionType}, Status=${transactionStatus}, Currency=${transactionCurrency}, Date Range=${dateFrom} to ${dateTo}`, 'info');
        
        // In a real implementation, you would use these values to filter the transactions
        // by making an API call or filtering locally
        simulateFilteredResults(transactionType, transactionStatus, transactionCurrency);
    });
}

function simulateFilteredResults(type, status, currency) {
    // This is a simplified simulation of filtering results
    const tableBody = document.querySelector('.transactions-table tbody');
    
    if (!tableBody) return;
    
    // Show all rows first
    const allRows = tableBody.querySelectorAll('tr');
    allRows.forEach(row => row.style.display = '');
    
    // Apply filters if not set to 'all'
    if (type !== 'all' || status !== 'all' || currency !== 'all') {
        allRows.forEach(row => {
            let showRow = true;
            
            // Check transaction type
            if (type !== 'all') {
                const rowType = row.querySelector('.transaction-type').classList.contains(type);
                showRow = showRow && rowType;
            }
            
            // Check transaction status
            if (status !== 'all') {
                const statusBadge = row.querySelector('.status-badge');
                showRow = showRow && statusBadge && statusBadge.classList.contains(status);
            }
            
            // Check currency
            if (currency !== 'all') {
                const amountText = row.querySelector('.transaction-amount').textContent;
                showRow = showRow && amountText.includes(currency);
            }
            
            // Show or hide the row
            row.style.display = showRow ? '' : 'none';
        });
        
        // Update the count of shown transactions
        const shownCount = Array.from(allRows).filter(row => row.style.display !== 'none').length;
        document.getElementById('shown-transactions').textContent = shownCount;
    } else {
        // If all filters are set to 'all', show the original count
        document.getElementById('shown-transactions').textContent = allRows.length;
    }
}

function setupTransactionModal() {
    const modal = document.getElementById('transaction-details-modal');
    const detailButtons = document.querySelectorAll('.view-details-btn');
    const closeButton = modal ? modal.querySelector('.modal-close') : null;
    
    if (!modal || !detailButtons.length || !closeButton) return;
    
    // Show modal when clicking detail buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-transaction-id');
            openTransactionModal(transactionId);
        });
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', function() {
        closeTransactionModal();
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeTransactionModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeTransactionModal();
        }
    });
    
    // Blockchain explorer and report issue buttons
    const blockchainBtn = modal.querySelector('.view-blockchain-btn');
    const reportBtn = modal.querySelector('.report-issue-btn');
    
    if (blockchainBtn) {
        blockchainBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening blockchain explorer in a new tab...', 'info');
            // In a real implementation, this would open a new tab with the blockchain explorer URL
            // window.open('https://blockchain-explorer.com/tx/' + transactionId, '_blank');
        });
    }
    
    if (reportBtn) {
        reportBtn.addEventListener('click', function() {
            showNotification('Your issue has been reported. Our support team will contact you shortly.', 'success');
            closeTransactionModal();
        });
    }
}

function openTransactionModal(transactionId) {
    const modal = document.getElementById('transaction-details-modal');
    if (!modal) return;
    
    // Update transaction ID in the modal
    const transactionIdElement = modal.querySelector('.transaction-detail-row:first-child .detail-value');
    if (transactionIdElement) {
        transactionIdElement.textContent = transactionId;
    }
    
    // In a real implementation, you would fetch the transaction details from your backend API
    // and update all the details in the modal
    
    // Show the modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling of the background
}

function closeTransactionModal() {
    const modal = document.getElementById('transaction-details-modal');
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Re-enable scrolling
}

function setupPagination() {
    const pageButtons = document.querySelectorAll('.pagination-page');
    const prevButton = document.querySelector('.pagination-btn.prev');
    const nextButton = document.querySelector('.pagination-btn.next');
    
    if (!pageButtons.length || !prevButton || !nextButton) return;
    
    // Add event listeners to page buttons
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all page buttons
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get page number
            const pageNumber = this.textContent;
            
            // Show notification for pagination (in a real implementation, this would load the data for the selected page)
            showNotification(`Navigating to page ${pageNumber}`, 'info');
        });
    });
    
    // Add event listeners to prev/next buttons
    prevButton.addEventListener('click', function() {
        // Find the currently active page button
        const activePage = document.querySelector('.pagination-page.active');
        if (!activePage) return;
        
        // Get the previous page button if it exists
        const prevPage = activePage.previousElementSibling;
        if (prevPage && prevPage.classList.contains('pagination-page')) {
            prevPage.click();
        } else {
            showNotification('You are already on the first page', 'info');
        }
    });
    
    nextButton.addEventListener('click', function() {
        // Find the currently active page button
        const activePage = document.querySelector('.pagination-page.active');
        if (!activePage) return;
        
        // Get the next page button if it exists
        const nextPage = activePage.nextElementSibling;
        if (nextPage && nextPage.classList.contains('pagination-page')) {
            nextPage.click();
        } else if (activePage.textContent !== '15') {
            // If we're not on the last page
            showNotification('Loading more pages...', 'info');
        } else {
            showNotification('You are already on the last page', 'info');
        }
    });
}

function setupExportButton() {
    const exportButton = document.querySelector('.export-btn');
    
    if (!exportButton) return;
    
    exportButton.addEventListener('click', function() {
        // Get current filter values
        const transactionType = document.getElementById('transaction-type').value;
        const transactionStatus = document.getElementById('transaction-status').value;
        const transactionCurrency = document.getElementById('transaction-currency').value;
        const dateFrom = document.getElementById('date-from').value;
        const dateTo = document.getElementById('date-to').value;
        
        // Show notification for export (in a real implementation, this would generate and download a CSV/Excel file)
        showNotification(`Exporting transactions with filters: Type=${transactionType}, Status=${transactionStatus}, Currency=${transactionCurrency}, Date Range=${dateFrom} to ${dateTo}`, 'success');
    });
}

function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-btn');
    
    if (!searchInput || !searchButton) return;
    
    // Search function
    const performSearch = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // If search term is empty, show all rows
            const allRows = document.querySelectorAll('.transaction-row');
            allRows.forEach(row => row.style.display = '');
            document.getElementById('shown-transactions').textContent = allRows.length;
            return;
        }
        
        // Filter rows based on search term
        const allRows = document.querySelectorAll('.transaction-row');
        let matchCount = 0;
        
        allRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const isMatch = rowText.includes(searchTerm);
            
            row.style.display = isMatch ? '' : 'none';
            
            if (isMatch) matchCount++;
        });
        
        // Update shown transactions count
        document.getElementById('shown-transactions').textContent = matchCount;
        
        // Show notification
        showNotification(`Found ${matchCount} transactions matching "${searchTerm}"`, 'info');
    };
    
    // Add event listener to search button
    searchButton.addEventListener('click', performSearch);
    
    // Add event listener for Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        // Create notification container if it doesn't exist
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.left = '50%';
        notificationContainer.style.transform = 'translateX(-50%)';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set styles based on notification type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#1e90ff';
    }
    
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.margin = '10px 0';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.maxWidth = '90%';
    notification.style.wordBreak = 'break-word';
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
// Language Settings Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Language Settings page functionality
    initLanguageSettingsPage();
});

function initLanguageSettingsPage() {
    // Only proceed if we're on the language settings page
    if (!document.getElementById('language-settings-page')) return;
    
    // Set up language option selection
    setupLanguageSelection();
    
    // Set up language search functionality
    setupLanguageSearch();
    
    // Set up regional settings
    setupRegionalSettings();
    
    // Set up toggle switches
    setupToggleSwitches();
    
    // Set up save and reset buttons
    setupSaveReset();
}

function setupLanguageSelection() {
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            languageOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.querySelector('.language-option-check').textContent = '';
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            this.querySelector('.language-option-check').textContent = '✓';
            
            // Update current language display
            updateCurrentLanguage(this);
        });
    });
}

function updateCurrentLanguage(selectedOption) {
    const currentLangFlag = document.querySelector('.current-language-display .language-flag');
    const currentLangName = document.querySelector('.current-language-display .language-name');
    
    if (!currentLangFlag || !currentLangName) return;
    
    // Get values from selected option
    const flag = selectedOption.querySelector('.language-option-flag').textContent;
    const name = selectedOption.querySelector('.language-option-name').textContent;
    
    // Update current language display
    currentLangFlag.textContent = flag;
    currentLangName.textContent = name;
    
    // Set region based on language name
    const regionElement = document.querySelector('.current-language-display .language-region');
    
    if (regionElement) {
        let region = '';
        
        // Determine region based on language name
        switch (name) {
            case 'English':
                region = 'United Kingdom';
                break;
            case 'Spanish':
                region = 'Spain';
                break;
            case 'French':
                region = 'France';
                break;
            case 'German':
                region = 'Germany';
                break;
            case 'Chinese (Simplified)':
                region = 'China';
                break;
            case 'Arabic':
                region = 'United Arab Emirates';
                break;
            case 'Russian':
                region = 'Russia';
                break;
            case 'Japanese':
                region = 'Japan';
                break;
            case 'Portuguese':
                region = 'Portugal';
                break;
            case 'Bengali':
                region = 'Bangladesh';
                break;
            default:
                region = '';
        }
        
        regionElement.textContent = region;
    }
    
    // Show notification for language change
    showNotification(`Language changed to ${name}`, 'success');
}

function setupLanguageSearch() {
    const searchInput = document.querySelector('.language-search-input');
    const searchButton = document.querySelector('.language-search-btn');
    
    if (!searchInput || !searchButton) return;
    
    // Search function
    const searchLanguages = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const languageOptions = document.querySelectorAll('.language-option');
        
        languageOptions.forEach(option => {
            const languageName = option.querySelector('.language-option-name').textContent.toLowerCase();
            
            // Show or hide option based on search term
            if (searchTerm === '' || languageName.includes(searchTerm)) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
        
        // Show/hide group titles if all options in a group are hidden
        const languageGroups = document.querySelectorAll('.language-group');
        
        languageGroups.forEach(group => {
            const groupOptions = group.querySelectorAll('.language-option');
            const allHidden = Array.from(groupOptions).every(opt => opt.style.display === 'none');
            
            const groupTitle = group.querySelector('.group-title');
            if (groupTitle) {
                groupTitle.style.display = allHidden ? 'none' : '';
            }
        });
    };
    
    // Add event listener to search button
    searchButton.addEventListener('click', searchLanguages);
    
    // Add event listener for keyup in search input
    searchInput.addEventListener('keyup', function(e) {
        searchLanguages();
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Add event listener for clear/cancel button on search input
    searchInput.addEventListener('search', searchLanguages);
}

function setupRegionalSettings() {
    const dateFormatSelect = document.getElementById('date-format');
    const timeFormatSelect = document.getElementById('time-format');
    const firstDaySelect = document.getElementById('first-day');
    const currencySelect = document.getElementById('currency');
    
    // Arrays of selects to make code cleaner
    const selects = [dateFormatSelect, timeFormatSelect, firstDaySelect, currencySelect];
    
    selects.forEach(select => {
        if (!select) return;
        
        select.addEventListener('change', function() {
            // Show notification for setting change
            const settingName = select.id.replace(/-/g, ' ');
            const settingValue = select.options[select.selectedIndex].text;
            
            showNotification(`${settingName.charAt(0).toUpperCase() + settingName.slice(1)} changed to ${settingValue}`, 'info');
        });
    });
}

function setupToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // Get preference title
            const prefTitle = this.closest('.preference-item').querySelector('.preference-title').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            
            // Show notification for toggle change
            showNotification(`${prefTitle} ${status}`, this.checked ? 'success' : 'info');
            
            // If right-to-left support is toggled, simulate RTL layout change
            if (prefTitle.includes('Right-to-Left')) {
                if (this.checked) {
                    simulateRTL();
                } else {
                    resetRTL();
                }
            }
        });
    });
}

function simulateRTL() {
    // This is a simplified simulation of enabling RTL support
    // In a real implementation, you would apply RTL styles to the entire app
    
    const languageContainer = document.querySelector('.language-container');
    if (!languageContainer) return;
    
    // Store original direction
    languageContainer.setAttribute('data-original-dir', languageContainer.style.direction || 'ltr');
    
    // Apply RTL styles to container as a preview
    languageContainer.style.direction = 'rtl';
    languageContainer.style.textAlign = 'right';
    
    // Show notification
    showNotification('Right-to-Left preview enabled. This is just a simulation.', 'info');
}

function resetRTL() {
    const languageContainer = document.querySelector('.language-container');
    if (!languageContainer) return;
    
    // Restore original direction
    const originalDir = languageContainer.getAttribute('data-original-dir') || 'ltr';
    languageContainer.style.direction = originalDir;
    languageContainer.style.textAlign = originalDir === 'rtl' ? 'right' : 'left';
}

function setupSaveReset() {
    const saveButton = document.querySelector('.save-btn');
    const resetButton = document.querySelector('.reset-btn');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // In a real implementation, you would save all settings to user preferences
            // Here, we just show a notification
            showNotification('Language and regional settings saved successfully', 'success');
        });
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset language to English
            const englishOption = document.querySelector('.language-option:nth-child(8)');
            if (englishOption) {
                englishOption.click();
            }
            
            // Reset regional settings
            const dateFormatSelect = document.getElementById('date-format');
            const timeFormatSelect = document.getElementById('time-format');
            const firstDaySelect = document.getElementById('first-day');
            const currencySelect = document.getElementById('currency');
            
            if (dateFormatSelect) dateFormatSelect.value = 'DD/MM/YYYY';
            if (timeFormatSelect) timeFormatSelect.value = '24h';
            if (firstDaySelect) firstDaySelect.value = 'monday';
            if (currencySelect) currencySelect.value = 'GBP';
            
            // Reset toggles
            const toggles = document.querySelectorAll('.toggle-switch input');
            toggles.forEach((toggle, index) => {
                // Enable first two toggles, disable the third one (RTL)
                toggle.checked = index < 2;
                
                // Reset RTL if it was enabled
                if (index === 2 && toggle.checked) {
                    resetRTL();
                }
            });
            
            // Clear search
            const searchInput = document.querySelector('.language-search-input');
            if (searchInput) {
                searchInput.value = '';
                const searchButton = document.querySelector('.language-search-btn');
                if (searchButton) searchButton.click();
            }
            
            // Show notification
            showNotification('All language and regional settings reset to default', 'info');
        });
    }
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        // Create notification container if it doesn't exist
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.left = '50%';
        notificationContainer.style.transform = 'translateX(-50%)';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set styles based on notification type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#1e90ff';
    }
    
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.margin = '10px 0';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.maxWidth = '90%';
    notification.style.wordBreak = 'break-word';
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
// Buy Coins Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find buy coins page elements
    const buyCoinsPage = document.getElementById('buy-coins-page');
    if (!buyCoinsPage) return;
    
    // Currency tabs functionality
    const currencyTabs = buyCoinsPage.querySelectorAll('.currency-tab');
    currencyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currencyTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update coin calculation based on selected currency
            updateCoinCalculation();
        });
    });
    
    // Amount presets functionality
    const amountPresets = buyCoinsPage.querySelectorAll('.amount-preset');
    const amountInput = buyCoinsPage.querySelector('.form-group input[type="number"]');
    
    if (amountPresets && amountInput) {
        amountPresets.forEach(preset => {
            preset.addEventListener('click', () => {
                amountPresets.forEach(p => p.classList.remove('selected'));
                preset.classList.add('selected');
                
                // Set input value to the selected preset amount
                const amount = preset.textContent.replace('$', '').replace(',', '');
                amountInput.value = amount;
                
                // Update coin calculation
                updateCoinCalculation();
            });
        });
        
        // Update amount when input changes
        amountInput.addEventListener('input', () => {
            // Remove selection from presets
            amountPresets.forEach(p => p.classList.remove('selected'));
            
            // Update coin calculation
            updateCoinCalculation();
        });
    }
    
    // Payment method selection
    const paymentMethods = buyCoinsPage.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            const paymentTitle = method.querySelector('.payment-title');
            if (paymentTitle) {
                console.log('Payment method selected:', paymentTitle.textContent);
                alert('Payment method selected: ' + paymentTitle.textContent);
            }
        });
    });
    
    // Submit button action
    const submitButton = buyCoinsPage.querySelector('.submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            console.log('Proceeding to payment...');
            alert('Proceeding to payment...');
        });
    }
    
    // Calculate and update the coin amount
    function updateCoinCalculation() {
        const totalAmountElement = buyCoinsPage.querySelector('.total-amount');
        if (!amountInput || !totalAmountElement) return;
        
        const amountValue = parseFloat(amountInput.value) || 0;
        const bitcoinRate = 65421.50; // Current BTC price
        
        // Calculate Bitcoin amount (minus service fee)
        const fee = 4.99;
        const bitcoinAmount = (amountValue - fee) / bitcoinRate;
        
        // Update the display
        totalAmountElement.textContent = bitcoinAmount.toFixed(8) + ' BTC';
    }
    
    // Initial calculation
    updateCoinCalculation();
});
// VIP Level Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize VIP Level Page functionality
    initVIPLevelPage();
});

function initVIPLevelPage() {
    // Only proceed if we're on the VIP level page
    if (!document.getElementById('vip-level-page')) return;
    
    // Upgrade button functionality
    const upgradeButton = document.querySelector('.upgrade-btn');
    
    if (upgradeButton) {
        upgradeButton.addEventListener('click', function() {
            // Show modal or notification about VIP upgrade
            showVIPUpgradeModal();
        });
    }
}

function showVIPUpgradeModal() {
    // Create modal dynamically
    const modal = document.createElement('div');
    modal.id = 'vip-upgrade-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    modal.innerHTML = `
        <div style="background-color: #242424; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; text-align: center;">
            <h2 style="color: #fff; margin-bottom: 20px;">VIP Upgrade Request</h2>
            <p style="color: #888; margin-bottom: 20px;">To upgrade your VIP level, please contact our support team.</p>
            <div style="display: flex; justify-content: space-between; gap: 15px;">
                <button id="close-vip-modal" style="flex: 1; background-color: #333; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer;">Close</button>
                <button id="contact-support" style="flex: 1; background-color: #1e90ff; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer;">Contact Support</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modal);
    
    // Close modal when clicking outside or on close button
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.id === 'close-vip-modal') {
            document.body.removeChild(modal);
        }
    });
    
    // Contact support button
    const contactSupportBtn = document.getElementById('contact-support');
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function() {
            // Simulate opening customer service page
            showPage('customer-service-page');
            
            // Remove modal
            document.body.removeChild(modal);
        });
    }
}

// Note: This assumes the existence of a global showPage function from script.js
