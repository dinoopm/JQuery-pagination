$(function () {
    var paging = {
        totPages: 23,
        pagesToDisplay: 10,
        pageStart: 1,
        pageEnd: 0,
        pageNumber: 1,
        pageIndex: 0,
        init: function () {

            paging.createPages();
            $("#paging .pageNos a:first").addClass('selected');
            $('a.next').bind('click', paging.moveToNext);
            $('a.prev').bind('click', paging.moveToPrev);
            $("#paging .pageNos a").live('click', paging.moveToPage);
        },
        createPages: function () {
            var pagerHtml = '';
            var pages;

            paging.pageEnd = paging.pageStart + paging.pagesToDisplay;

            if (paging.totPages >= paging.pageEnd) {
                pages = paging.pageEnd - 1;
            } else {
                pages = paging.totPages;
            }
            console.log(paging.pageStart + '|');
            console.log(pages + '|');
            for (var i = paging.pageStart; i <= pages; i++) {
                pagerHtml += "<a href='#'>" + i + "</a>"
            }

            $("#paging .pageNos").html(pagerHtml);
        },
        moveToNext: function (e) {
            e.preventDefault();

            paging.pageNumber = parseInt($('.pageNos .selected').text());


            if (paging.totPages === paging.pageNumber) {
                return;
            } else {
                if (paging.pageNumber == paging.pageEnd - 1) {
                    paging.pageStart = paging.pageEnd;
                    paging.pageEnd = paging.pageEnd + paging.pagesToDisplay
                    paging.createPages();
                    paging.pageIndex = 0;
                    $("#paging .pageNos a:first").addClass('selected');
                } else {
                    paging.pageIndex = paging.pageIndex + 1;
                    $(".pageNos a").removeClass("selected");
                    $(".pageNos a").eq(paging.pageIndex).addClass("selected")
                }
            }
        },
        moveToPrev: function (e) {
            e.preventDefault();

            paging.pageNumber = parseInt($('.pageNos .selected').text());

            if (paging.pageNumber == 1) {
                return;
            } else {
                if (paging.pageNumber == paging.pageStart) {

                    paging.pageStart = parseInt(paging.pageNumber) - parseInt(paging.pagesToDisplay);
                    paging.pageEnd = parseInt(paging.pageStart) + parseInt(paging.pagesToDisplay);
                    paging.createPages();
                    paging.pageIndex = paging.pagesToDisplay;
                    $("#paging .pageNos a:last").addClass('selected');
                } else {
                    paging.pageIndex = paging.pageIndex - 1;
                    $(".pageNos a").removeClass("selected");
                    $(".pageNos a").eq(paging.pageIndex).addClass("selected");
                }
            }
        },
        moveToPage: function (e) {
            e.preventDefault();
            $(".pageNos a").removeClass("selected");
            paging.pageIndex = $(this).index();
            $(".pageNos a").eq(paging.pageIndex).addClass("selected");
        }
    }
    paging.init();
})