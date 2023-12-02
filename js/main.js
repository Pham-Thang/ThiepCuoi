const data = {
    groomName: 'Hồng Hạnh', // Tên chú rể
    groomPhoneNumber: '0123456789', // SĐT chú rể
    brideName: 'Hồng Hạnh', // Tên cô dâu
    bridePhoneNumber: '0123456789', // SĐT cô dâu
    time: "2024-01-18T17:00:00", // Ngày cưới
    startTime: "2024-01-18T11:00:00", // Thời gian bắt đầu
    endTime: "2024-01-18T12:00:00", // Thời gian kết thúc
    location: '', // Địa điểm
    slideImagePath: './images/slides/images/',
    slideImageExtension: '.PNG',
    slideThumbnailPath: './images/slides/thumbnails/',
    slideThumbnailExtension: '.PNG',
    photoGalleryImages: ["0", "1", "2", "3", "4", "5", "6", '7', "8", "9"],
    ggSheetResponseUrl: "https://script.google.com/macros/s/AKfycbwTHZaR97m5E5ZG7Drts_EdvHREf4FOsOYB98LvbjGHXN8LWWQVL1nok_pHDmia7_it/exec", // Link exec gg script
    bankAccountName: 'Phạm Thị Hồng Hạnh', // Tên TK ngân hàng
    bankAccountNumber: '0000000', // Số TK ngân hàng
    bankName: 'ACB', // Tên ngân hàng
    momoLink: 'https://me.momo.vn/phamthang',
    /** Đường dẫn nhúng gg map */
    ggMapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.1808373921294!2d105.7953435760691!3d21.065438386516178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aadba34c8bed%3A0xad3a9c84de49ee8!2zTjAzLVQxIE5nb-G6oWkgR2lhbyDEkG_DoG4!5e0!3m2!1svi!2s!4v1701453395247!5m2!1svi!2s',
}

const AttendStatus = Object.freeze({
    NotComing: "NotComing", //: "Rất tiếc",
    Maybe: "Maybe", // : "Có thể",
    Attend: "Attend", // : "Tham dự",
});

const CustomerType = Object.freeze({
    Bride: "Bride", // : "Nhà gái",
    Groom: "Groom" // : "Nhà trai",
})

const AttendeeNumber = Object.freeze({
    One: "One", // : "1 người",
    Two: "Two", // : "2 người",
    Other: "Other", // : "Trên 2 người",
})

$(document).ready(function () {
    playAudio();
    updateInfo(data);
    setupCounter(data);
    setupCalendar(data);
    setupPhotoGallery(data);
    setupResponseBox(data);
});

/**
 * Phát nhạc
 */
playAudio = function() {
    const audio = $('#bg_audio')[0];
    audio && audio.play();
}

/**
 * Cập nhật thông tin
 */
updateInfo = function ({ bankAccountName, bankAccountNumber, bankName, ggMapLink, brideName, groomName, groomPhoneNumber, bridePhoneNumber, momoLink }) {
    $('#bankAccountName').text(bankAccountName);
    $('#bankAccountNumber').text(`${bankName} - ${bankAccountNumber}`);
    $('#ggMap').attr('src', ggMapLink);
    $('.groomName').text(groomName);
    $('.brideName').text(brideName);
    $('.groomPhoneNumber:not(a)').text(groomPhoneNumber);
    $('a.groomPhoneNumber').attr('href', `tel:${groomPhoneNumber}`);
    $('.bridePhoneNumber:not(a)').text(bridePhoneNumber);
    $('a.bridePhoneNumber').attr('href', `tel:${bridePhoneNumber}`);
    $('.momoLink').attr('href', momoLink);
}

/**
 * Cài đặt bộ đếm thời gian
 */
setupCounter = function ({ time }) {
    var countDownDate = new Date(time).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (parseInt(hours) < 10) {
            hours = "0" + parseInt(hours);
        }
        if (parseInt(minutes) < 10) {
            minutes = "0" + parseInt(minutes);
        }
        if (parseInt(seconds) < 10) {
            seconds = "0" + parseInt(seconds);
        }
        if (parseInt(days) < 10) {
            days = "0" + parseInt(days);
        }

        $(".day-left .num").html(days);
        $(".hour-left .num").html(hours);
        $(".minute-left .num").html(minutes);
        $(".second-left .num").html(seconds);

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            $(".day-left .num").html('00');
            $(".hour-left .num").html('00');
            $(".minute-left .num").html('00');
            $(".second-left .num").html('00');
        }
    }, 1000);
}

/**
 * Cài đặt phần đặt lịch
 */
setupCalendar = function ({ groomName, brideName, startTime, endTime }) {
    var eventData = {
        "title": `Lễ cưới của Chú rể ${groomName} và Cô dâu ${brideName}`,
        "desc": `Thiệp cưới online của Chú rể ${groomName} và Cô dâu ${brideName}`,
        "start": startTime,
        "end": endTime,
        "location": "",
        "timezone": "Asia/Bangkok"
    };
    var formatTextParam = function (text) {
        return text.replaceAll(" ", "+");
    }
    var formatDateParam = function (date) {
        var tempDate = null;
        var result = ""

        if (typeof (date) == "string") {
            tempDate = new Date(date);
        }
        if (typeof (date.getDate) == "function") {
            tempDate = date;
        }

        if (tempDate) {
            result = tempDate.formatDateTime();
        }

        return result.replaceAll("-", "").replaceAll(":", "");
    }

    var url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${formatTextParam(eventData.title)}
    &dates=${formatDateParam(eventData.start) + "/" + formatDateParam(eventData.end)}&details=${eventData.desc}&location=${location}&ctz=${eventData.timezone}&output=xml`;

    $('#btn_save_event').on('click', function () {
        window.open(url);
    });
}

/**
 * Cài đặt phần album ảnh
 */
setupPhotoGallery = function ({ slideImagePath, slideThumbnailPath, photoGalleryImages, slideImageExtension, slideThumbnailExtension }) {
    var slideIndex = 1;
    var touchstartX = 0; // điểm bắt đầu
    var touchendX = 0; // điểm kết thúc

    // build ra danh sách các ảnh
    for (var i = 0; i < photoGalleryImages.length; i++) {
        var imgName = photoGalleryImages[i],
            imgHtml = `<div class="mySlides">
                <div class="wedding-image" style="background-image: url('` + `${slideImagePath}${imgName}${slideImageExtension}` + `');"></div>
            </div>`;

        $("#photo_gallery_page .slideshow-container").append(imgHtml);
    }

    for (var i = 0; i < photoGalleryImages.length; i++) {
        var imgName = photoGalleryImages[i],
            imgHtml = `<div class="thumbnail-wrapper">
            <img class="demo cursor" src="` + `${slideThumbnailPath}${imgName}${slideThumbnailExtension}` + `" style="width:100%" thumbnail-index="` + (i + 1) + `">
        </div>`;

        $("#photo_gallery_page .thumbnail-images").append(imgHtml);
    }

    function plusSlides(n) {
        slideIndex += n;

        showSlides(slideIndex);

        // Thực hiện focus tới thumbnail tương ứng
        var dots = $("#photo_gallery_page .thumbnail-wrapper .demo");
        var scrollArea = $("#photo_gallery_page .thumbnail-images");
        var curDotRect = dots[slideIndex - 1].getBoundingClientRect(),
            curDotLeft = curDotRect.left,
            curDotWidth = curDotRect.width,
            maxRight = scrollArea.width();

        // bị ẩn bên trái
        if (curDotLeft < 0) {
            scrollArea.scrollLeft((slideIndex - 1) * curDotWidth);
        }

        // bị ẩn bên phải
        if (curDotLeft + curDotWidth > maxRight) {
            scrollArea.scrollLeft((slideIndex - 5) * curDotWidth);
        }
    }

    function showSlides(n) {
        var slides = $("#photo_gallery_page .mySlides");
        var dots = $("#photo_gallery_page .thumbnail-wrapper .demo");

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length
        }

        for (var i = 0; i < slides.length; i++) {
            $(slides[i]).hide();
        }

        for (i = 0; i < dots.length; i++) {
            $(dots[i]).removeClass("active");
        }

        $(slides[slideIndex - 1]).show();
        $(dots[slideIndex - 1]).addClass("active");
    }

    // Thực hiện event click
    $("#photo_gallery_page .slideshow-container").on("click", ".prev", plusSlides.bind(this, -1));

    $("#photo_gallery_page .slideshow-container").on("click", ".next", plusSlides.bind(this, 1));

    $("#photo_gallery_page .thumbnail-images").on("click", "img.cursor", function (evt) {
        slideIndex = parseInt(this.attributes["thumbnail-index"].value);

        showSlides(slideIndex);
    });

    // Thực hiện event lướt
    $("#photo_gallery_page .slideshow-container").on("touchstart", function (evt) {
        touchstartX = evt.changedTouches[0].screenX;
    });

    $("#photo_gallery_page .slideshow-container").on("touchend", function (evt) {
        touchendX = evt.changedTouches[0].screenX;

        // swiped left
        if (touchendX < touchstartX - 50) {
            plusSlides(1);
        }
        // swiped right
        if (touchendX - 50 > touchstartX) {
            plusSlides(-1);
        }
    });

    // hiển thị mặc định ảnh đầu tiên
    showSlides(slideIndex);
}

/**
 * Cài đặt form phản hồi
 */
setupResponseBox = function ({ ggSheetResponseUrl }) {
    $(".form-control[name='customer_type']").val(CustomerType.Bride);
    $(".form-control[name='attend_status']").val(AttendStatus.Attend);

    // thêm các event
    // event chọn loại khách
    $("#response_box_page").on("click", "label.option", function (event) {
        var rdId = $(event.currentTarget).attr("for");
        var newVal = $(`input#${rdId}`).val();

        $(".form-control[name='customer_type']").val(newVal);
    });

    // event chọn trạng thái tham gia
    $("#response_box_page").on("click", "label.optionboxp", function (event) {
        var rdId = $(event.currentTarget).attr("for");
        var newVal = $(`input#${rdId}`).val();

        if (newVal != AttendStatus.Attend) {
            $("#response_box_page .element-hide-rap").hide();
        }
        else {
            $("#response_box_page .element-hide-rap").show();
        }

        $(".form-control[name='attend_status']").val(newVal);
    });

    // event gửi phản hồi
    $("#response_box_page").on("click", "#btn_send_response", function (event) {
        var btnSend = this;
        var data = getResponseBoxData();
        var originMsg = "Gửi phản hồi";
        var processingMsg = "Đang gửi phản hồi";
        var successMsg = "Đã gửi phản hồi";
        var errorMsg = "Bạn gửi phản hồi không thành công, vui lòng thử lại!";

        if (!data["customer_name"]) {
            alert("Vui lòng nhập Tên khách mời!");
            $(".form-control[name='customer_name']").focus();
        }
        else {
            $(btnSend).text(processingMsg);
            $(btnSend).addClass("disabled");

            $.ajax({
                url: ggSheetResponseUrl,
                method: "GET",
                dataType: "json",
                data: data,
                success: function (response) {
                    if (response["result"] == "success") {
                        $(btnSend).text(successMsg);
                    }
                    else {
                        $(btnSend).text(originMsg);
                        $(btnSend).removeClass("disabled");
                        alert(errorMsg);
                    }
                },
                error: function () {
                    $(btnSend).text(originMsg);
                    $(btnSend).removeClass("disabled");
                    alert(errorMsg);
                }
            });
        }
    });
}

/**
 * Lấy dữ liệu phản hồi từ khách mời
 */
getResponseBoxData = function () {
    var data = {
        // customer_type
        // customer_name
        // attend_status
        // attendee_number
        // customer_wishes
    }
    var formFields = $("#response_box_page .form-control");

    $.each(formFields, function (index, obj) {
        var isVisible = $(obj).parents(".element-hide-rap").css("display") != "none",
            key = $(obj).attr("name"),
            value = isVisible ? $(obj).val() : "";

        data[key] = value;
    });

    return data;
}
