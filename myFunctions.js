/* ==========================================================================
   CAR RENTAL WEBSITE — SVU F25
   Unified JavaScript & jQuery Implementation (myFunctions.js)
   Strict Monochrome Design & Strict XHTML Compatibility
   ========================================================================== */

// 1. Car Inventory Data Catalog
var CARS_CATALOG = {
    'CR-001': { code: 'CR-001', model: 'Toyota Corolla', year: 2023, price: 250000 },
    'CR-002': { code: 'CR-002', model: 'Kia Sportage', year: 2022, price: 400000 },
    'CR-003': { code: 'CR-003', model: 'Hyundai Elantra', year: 2024, price: 300000 },
    'CR-004': { code: 'CR-004', model: 'Chevrolet Spark', year: 2021, price: 180000 },
    'CR-005': { code: 'CR-005', model: 'Nissan Qashqai', year: 2024, price: 350000 }
};

// Ensure DOM is fully loaded using jQuery
$(document).ready(function() {

    /* ----------------------------------------------------------------------
       1. jQuery Show/Hide Details Feature (إظهار وإخفاء تفاصيل السيارات)
       ---------------------------------------------------------------------- */
    // Using jQuery change event on detail checkboxes
    $('.detail-checkbox').change(function() {
        var carCode = $(this).attr('data-car');
        var detailsRow = $('#details-' + carCode);

        if ($(this).is(':checked')) {
            // Show details smoothly using jQuery slideToggle / show
            detailsRow.slideToggle(true);
        } else {
            // Hide details when unchecked
            detailsRow.slideToggle(false);
        }
    });

    /* ----------------------------------------------------------------------
       2. Continue Button Handler (زر متابعة)
       ---------------------------------------------------------------------- */
    $('#btnContinue').click(function(e) {
        e.preventDefault();
        handleContinueAction();
    });

    /* ----------------------------------------------------------------------
       3. Form Submission & Validation (التحقق من نموذج الحجز وحساب التكلفة)
       ---------------------------------------------------------------------- */
    $('#reservationForm').submit(function(e) {
        e.preventDefault();
        validateAndProcessReservation();
    });

    /* ----------------------------------------------------------------------
       4. Close Result Modal Handler (إغلاق نافذة النتيجة)
       ---------------------------------------------------------------------- */
    $(document).on('click', '#btnCloseModal, .result-modal-overlay', function(e) {
        if (e.target === this) {
            $('#resultModalOverlay').fadeOut(200, function() {
                $(this).remove();
            });
        }
    });
});

/**
 * Reads selected cars, verifies at least one car is selected,
 * and displays the reservation form and summary on the same page.
 */
function handleContinueAction() {
    var selectedCars = getSelectedCars();
    var alertBox = $('#selectionAlert');
    var formSection = $('#reservationSection');
    var summaryContainer = $('#selectedCarsSummary');

    if (selectedCars.length === 0) {
        // Show clear Arabic error message in strict monochrome
        alertBox.text('[!] تنبيه: يرجى اختيار سيارة واحدة على الأقل من الجدول أعلاه لمتابعة الحجز.').show();
        formSection.hide();
        // Scroll to alert
        $('html, body').animate({
            scrollTop: alertBox.offset().top - 20
        }, 300);
        return;
    }

    // Hide error alert
    alertBox.hide();

    // Render selected cars summary
    var summaryHtml = '<div class="selected-summary-box">';
    summaryHtml += '<div class="selected-summary-title">السيارات المحددة للحجز (' + selectedCars.length + '):</div>';
    for (var i = 0; i < selectedCars.length; i++) {
        var car = selectedCars[i];
        summaryHtml += '<span class="selected-car-badge">' + 
            car.model + ' (' + car.code + ') — ' + formatCurrency(car.price) + ' ل.س/يوم' + 
            '</span>';
    }
    summaryHtml += '</div>';
    summaryContainer.html(summaryHtml);

    // Show reservation form smoothly without page reload
    formSection.fadeIn(300);

    // Smooth scroll down to the form
    $('html, body').animate({
        scrollTop: formSection.offset().top - 20
    }, 400);
}

/**
 * Returns an array of selected car objects based on checked checkboxes.
 */
function getSelectedCars() {
    var selected = [];
    $('.car-select:checked').each(function() {
        var code = $(this).val();
        if (CARS_CATALOG[code]) {
            selected.push(CARS_CATALOG[code]);
        }
    });
    return selected;
}

/**
 * Validates the reservation form according to strict specifications:
 * 1. Full Name: optional, Arabic characters & spaces only if entered.
 * 2. National ID: mandatory, 11 digits, first two digits 01-14.
 * 3. Start Date: mandatory, valid date yyyy-mm-dd.
 * 4. End Date: mandatory, valid date, strictly after Start Date.
 * 5. Mobile: optional, Syrian Syriatel or MTN format if entered.
 * 6. Email: optional, valid email format if entered.
 */
function validateAndProcessReservation() {
    // Clear previous error messages
    $('.field-error').text('');
    $('input').removeClass('input-error input-success');

    var isValid = true;

    // 1. Full Name (الاسم الكامل)
    var fullName = $('#fullName').val().trim();
    if (fullName !== '') {
        // Arabic characters and spaces regex
        var arabicRegex = /^[\u0621-\u064A\s]+$/;
        if (!arabicRegex.test(fullName)) {
            showFieldError('fullName', 'الاسم يجب أن يحتوي على أحرف هجائية عربية ومسافات فقط.');
            isValid = false;
        } else {
            markFieldSuccess('fullName');
        }
    }

    // 2. National ID (الرقم الوطني) - Mandatory, 11 digits, governorate 01-14
    var nationalId = $('#nationalId').val().trim();
    if (nationalId === '') {
        showFieldError('nationalId', 'الرقم الوطني إلزامي.');
        isValid = false;
    } else {
        var nationalIdRegex = /^(0[1-9]|1[0-4])[0-9]{9}$/;
        if (!/^[0-9]+$/.test(nationalId)) {
            showFieldError('nationalId', 'الرقم الوطني يجب أن يتألف من أرقام فقط.');
            isValid = false;
        } else if (nationalId.length !== 11) {
            showFieldError('nationalId', 'الرقم الوطني يجب أن يتألف من 11 خانة عددية تماماً.');
            isValid = false;
        } else if (!nationalIdRegex.test(nationalId)) {
            showFieldError('nationalId', 'أول خانتين يجب أن ترمزا إلى محافظة سورية صالحة (من 01 إلى 14).');
            isValid = false;
        } else {
            markFieldSuccess('nationalId');
        }
    }

    // 3. Start Date (تاريخ البداية) - Mandatory, valid format
    var startDateVal = $('#startDate').val().trim();
    var startDate = null;
    if (startDateVal === '') {
        showFieldError('startDate', 'تاريخ بداية التأجير إلزامي.');
        isValid = false;
    } else {
        startDate = parseAndValidateDate(startDateVal);
        if (!startDate) {
            showFieldError('startDate', 'تاريخ بداية التأجير غير صالح (الصيغة المطلوبة: YYYY-MM-DD).');
            isValid = false;
        } else {
            markFieldSuccess('startDate');
        }
    }

    // 4. End Date (تاريخ النهاية) - Mandatory, valid date, strictly after Start Date
    var endDateVal = $('#endDate').val().trim();
    var endDate = null;
    if (endDateVal === '') {
        showFieldError('endDate', 'تاريخ نهاية التأجير إلزامي.');
        isValid = false;
    } else {
        endDate = parseAndValidateDate(endDateVal);
        if (!endDate) {
            showFieldError('endDate', 'تاريخ نهاية التأجير غير صالح (الصيغة المطلوبة: YYYY-MM-DD).');
            isValid = false;
        } else if (startDate && endDate <= startDate) {
            showFieldError('endDate', 'تاريخ نهاية التأجير يجب أن يكون لاحقاً لتاريخ البداية.');
            isValid = false;
        } else {
            markFieldSuccess('endDate');
        }
    }

    // 5. Mobile Phone (رقم الموبايل) - Optional, Syriatel or MTN format if entered
    var mobile = $('#mobileNumber').val().trim();
    if (mobile !== '') {
        // Syrian Syriatel & MTN regex (10 digits starting with 09)
        // Syriatel: 093, 098, 099, 097 | MTN: 094, 095, 096
        var syrianMobileRegex = /^09(3[0-9]|8[0-9]|9[0-9]|7[0-9]|4[0-9]|5[0-9]|6[0-9])[0-9]{6}$/;
        if (!syrianMobileRegex.test(mobile)) {
            showFieldError('mobileNumber', 'رقم الموبايل غير صحيح (يجب أن يبدأ بـ 09 ويتألف من 10 أرقام ويطابق سيرياتيل أو MTN).');
            isValid = false;
        } else {
            markFieldSuccess('mobileNumber');
        }
    }

    // 6. Email (البريد الإلكتروني) - Optional, valid format if entered
    var email = $('#email').val().trim();
    if (email !== '') {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            showFieldError('email', 'صيغة البريد الإلكتروني غير صحيحة (مثال: user@example.com).');
            isValid = false;
        } else {
            markFieldSuccess('email');
        }
    }

    // Prevent submission and calculation if any error exists
    if (!isValid) {
        return false;
    }

    // Ensure at least one car is selected
    var selectedCars = getSelectedCars();
    if (selectedCars.length === 0) {
        $('#selectionAlert').text('[!] تنبيه: لم يتم تحديد أي سيارة. يرجى اختيار سيارة من الجدول أعلاه.').show();
        return false;
    }

    // Calculate duration in days (End Date not counted as an extra day)
    var diffTime = endDate.getTime() - startDate.getTime();
    var rentalDays = Math.round(diffTime / (1000 * 3600 * 24));

    if (rentalDays <= 0) {
        showFieldError('endDate', 'مدة التأجير يجب أن تكون يوماً واحداً على الأقل.');
        return false;
    }

    // Calculate costs and discount
    calculateAndShowResult(selectedCars, rentalDays, fullName, nationalId);
    return true;
}

/**
 * Parses and verifies actual calendar date validity (checks leap years, month days, etc.)
 */
function parseAndValidateDate(dateString) {
    var parts = dateString.split('-');
    var year, month, day;

    if (parts.length !== 3) return null;

    if (parts[0].length === 4) {
        // yyyy-mm-dd
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
    } else if (parts[2].length === 4) {
        // dd-mm-yyyy
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        year = parseInt(parts[2], 10);
    } else {
        return null;
    }

    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    if (month < 0 || month > 11 || day < 1 || day > 31) return null;

    var date = new Date(year, month, day);
    // Strict calendar check
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
    }

    return date;
}

/**
 * Calculates rental cost and renders result window:
 * - Daily Rate * Rental Days for each car.
 * - 10% discount if rentalDays > 7.
 * - Summation across all selected cars.
 */
function calculateAndShowResult(selectedCars, rentalDays, fullName, nationalId) {
    var totalBeforeDiscount = 0;
    var totalDiscount = 0;
    var finalAmount = 0;
    var isDiscountApplied = rentalDays > 7;

    var carsBreakdownHtml = '';

    for (var i = 0; i < selectedCars.length; i++) {
        var car = selectedCars[i];
        var carCost = car.price * rentalDays;
        var carDiscount = isDiscountApplied ? (carCost * 0.10) : 0;
        var carFinal = carCost - carDiscount;

        totalBeforeDiscount += carCost;
        totalDiscount += carDiscount;
        finalAmount += carFinal;

        carsBreakdownHtml += '<div class="result-row">' +
            '<div><strong>' + car.model + ' (' + car.code + ')</strong><br />' +
            '<span style="font-size:12px; color:#666666;">السعر اليومي: ' + formatCurrency(car.price) + ' ل.س × ' + rentalDays + ' أيام</span></div>' +
            '<div><strong>' + formatCurrency(carCost) + ' ل.س</strong></div>' +
            '</div>';
    }

    // Modal HTML Construction in Strict Monochrome
    var modalHtml = '<div class="result-modal-overlay" id="resultModalOverlay">' +
        '<div class="result-card">' +
            '<div class="result-header">' +
                '<h3>تفاصيل الحجز والفاتورة النهائية</h3>' +
                '<button type="button" id="btnCloseModal" style="background:none; border:none; color:#FFFFFF; font-size:22px; cursor:pointer;">&times;</button>' +
            '</div>' +
            '<div class="result-body">' +
                '<p><strong>اسم مقدم الطلب:</strong> ' + (fullName ? fullName : 'غير محدد') + '</p>' +
                '<p><strong>الرقم الوطني:</strong> <span class="code-badge">' + nationalId + '</span></p>' +
                '<p><strong>مدة التأجير:</strong> ' + rentalDays + ' يوم/أيام</p>' +
                '<hr style="border:none; border-top:1px solid #D9D9D9; margin:14px 0;" />' +
                '<div style="font-weight:800; margin-bottom:8px; color:#000000;">تفصيل السيارات المختارة:</div>' +
                carsBreakdownHtml +
                '<hr style="border:none; border-top:1px solid #D9D9D9; margin:14px 0;" />' +
                '<div class="result-row">' +
                    '<div>مجموع التكلفة قبل الخصم:</div>' +
                    '<div><strong>' + formatCurrency(totalBeforeDiscount) + ' ل.س</strong></div>' +
                '</div>';

    if (isDiscountApplied) {
        modalHtml += '<div class="result-row discount-row">' +
            '<div>خصم المدة الطويلة (10% لتجاوز 7 أيام):</div>' +
            '<div>- ' + formatCurrency(totalDiscount) + ' ل.س</div>' +
        '</div>';
    } else {
        modalHtml += '<div class="result-row" style="color:#666666; font-size:13px;">' +
            '<div>الخصم:</div>' +
            '<div>لا ينطبق (المدة 7 أيام أو أقل)</div>' +
        '</div>';
    }

    modalHtml += '<div class="result-row final-row">' +
                    '<div>المبلغ النهائي المطلوب:</div>' +
                    '<div class="final-amount-val">' + formatCurrency(finalAmount) + ' ل.س</div>' +
                '</div>' +
            '</div>' +
            '<div class="result-footer">' +
                '<button type="button" class="btn btn-primary" onclick="$(\'#resultModalOverlay\').fadeOut(200, function(){ $(this).remove(); });">تأكيد وإغلاق</button>' +
            '</div>' +
        '</div>' +
    '</div>';

    // Remove existing modal if any and append new one
    $('#resultModalOverlay').remove();
    $('body').append(modalHtml);
    $('#resultModalOverlay').fadeIn(200);
}

/**
 * Utility: Shows error text below a field and highlights input.
 */
function showFieldError(fieldId, errorText) {
    $('#' + fieldId).addClass('input-error').removeClass('input-success');
    $('#error-' + fieldId).text(errorText);
}

/**
 * Utility: Marks input as valid.
 */
function markFieldSuccess(fieldId) {
    $('#' + fieldId).removeClass('input-error').addClass('input-success');
    $('#error-' + fieldId).text('');
}

/**
 * Utility: Formats number with thousands separator.
 */
function formatCurrency(number) {
    return Number(number).toLocaleString('ar-SY');
}
