

$(document).ready(function () {

    var $form = $("#speech-gen__form"),
        $rows = $(".speech-gen__row", $form),
        $result = $(".speech-gen__result", $form),
        $resultTitle = $("#result-phrase", $result),
        result = [true, true, true, true, true],
        resultLength = result.length,
        resultNumbers = [];




    function animateHideShow(hideObj, showObj) {
        var $dfd = new $.Deferred(),
            $promise = $dfd.promise();

        if (hideObj) {
            hideObj
                .animate({
                    opacity: 0,
                    top: -20
                }, {
                    duration: 600,
                    complete: function () {
                        hideObj.hide();
                        $dfd.resolve();
                    }
                });
        } else {
            $dfd.resolve();
        }

        $.when($promise).then(function () {
            showObj.css({
                opacity: 0,
                top: 20
            });

            showObj
                .show()
                .animate({
                    opacity: 1,
                    top: 0
                }, {
                    duration: 600,
                    complete: function () {
                        initBlock(showObj);
                    }
                });
        });

    }

    function initBlock($block) {
        $block.delegate("input", "change", function () {
            var $thisInput = $(this),
                $next = $block.next(".speech-gen__row");

            refreshResult($thisInput.data("answer"));

            if ($next.is(":hidden")) {
                animateHideShow($block, $next);
            }

        });
    }

    function refreshResult(answer) {
        var last,
            hasVari = false,
            vari = {
                true: "подойдут варианты ",
                false: "подойдет вариант "
            };

        resultNumbers = [];

        for (var i = 0; i < resultLength; i++) {
            var num = i + 1;
            result[i] = result[i] && answer[i];
            result[i] && resultNumbers.push(num);
            $result.toggleClass("show-" + num, result[i]);
        }



        hasVari = resultNumbers.length > 1;

        $resultTitle.text(vari[hasVari]);

    }



    animateHideShow(null, $rows.eq(0));


});