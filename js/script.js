

$(document).ready(function () {

    var $form = $("#speech-gen__form"),
        $rows = $(".speech-gen__row", $form),
        $resultTextNode = $("#result-phrase", $form),
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
                true: "подойдут способы ",
                false: "подойдет способ "
            };

        resultNumbers = [];

        for (var i = 0; i < resultLength; i++) {
            result[i] = result[i] && answer[i];
            !!result[i] && resultNumbers.push(i + 1);
        }

        last = resultNumbers.pop();

        hasVari = !!resultNumbers.length;

        $resultTextNode.text(vari[hasVari] + resultNumbers.join(", ") + (hasVari ? " и " : "") +  last);

    }



    animateHideShow(null, $rows.eq(0));


});