$(document).ready(function(){
    //=========Code Custom Select box ===============================
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select-reusable");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    selElmnt.parentElement.id;
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
         create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        // add additional parameteres based on specific select
        switch (selElmnt.parentElement.id) {
            case "reason-select":
                c.setAttribute("data-next", 'step3-' + selElmnt.options[j].value);
                c.setAttribute("data-current", 'step2'); 
                break;
        
            default:
                break;
        }
        
        c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
             and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    // call function to change step based on selection.
                    switch (this.parentElement.parentElement.id) {
                        case "reason-select":
                            showNextStep(this.dataset.next,this.dataset.current);
                            displaySelection(this.dataset.current,this.innerHTML);
                            break;
                        case "new-billing-cycle-select":
                            $('#cycle-change-confirm').removeClass('disabled')
                            break;
                        case "fee-waiver-select":
                            $('#fee-waiver-confirm').removeClass('disabled');
                            break;
                        default:
                            break;
                    }
                    
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
         and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");

    });
}

// STEP CHANGE COMMON FUNCTION
// $(".stepChangeTrigger").click(function () {
//     const nextStep = this.dataset.next;
//     const currentStep = this.dataset.current;
//     showNextStep(nextStep,currentStep)

//     // $(this).parents(".main-wrap.my-profile").removeClass("active");
//     // $(this).parents(".main-wrap.my-profile").addClass("filled");   
//     // $(this).parents(".main-wrap.my-profile").find(".mumer-heading").addClass("toggle");
//     // switch (nextStep) {
//     //     case 'step2':
//     //         $(".main-wrap.my-profile#step2").addClass("active");      
//     //         break;
    
//     //     default:
//     //         break;
//     // }
//     // $(this).parents(".main-wrap.my-profile").removeClass("active");                              
                         
    
//     // $(this).parents(".main-wrap.my-profile").siblings("#step2").addClass("active");     
//     var target = $(this.hash);
//     target = target.length ? target : $('#' + nextStep);
//     if (target.length) {
//         $('html,body').animate({
//             scrollTop: (target.offset().top - 110)
//         });
//         return false;
//     }
// });

})

function displaySelection(step,selectionText){
    switch (step) {
        case 'step2':
            $('.main-wrap#step2 .sub-heading').text(selectionText)
            $('#closure-readon').text(selectionText)
            break;
    
        default:
            break;
    }
}

function showNextStep(nextStep,currentStep) {

    // hide other steps of 3rd category
    const nextStepDashIndex = nextStep.indexOf('-')
    if(nextStep.substr(0,nextStepDashIndex) == 'step3'){
        $('.main-wrap.step-3-wrapp.active').addClass('hidden');
        $('.main-wrap.step-3-wrapp.active').removeClass('active');
    }

    // hide current Step if it exists
    // expect when others i,e. step3-6 is chosen
    if(nextStep == "step3-6"){
        $('.select-reson-cnt.others').show();
        return;
    }
    if(currentStep){
        $('.main-wrap.my-profile#'+currentStep).addClass('filled');    
        $('.main-wrap.my-profile#'+currentStep).removeClass('active');    
    }
    // make next step active
    $('.main-wrap.my-profile.hidden#'+nextStep).removeClass('hidden');
    $('.main-wrap.my-profile#'+nextStep).addClass('active');
    $('.main-wrap.my-profile#'+nextStep).find(".mumer-heading").addClass("toggle");

    var target = $(this.hash);
    target = target.length ? target : $('#' + nextStep);
    if (target.length) {
        $('html,body').animate({
            scrollTop: (target.offset().top - 110)
        });
        return false;
    }
}

function availOffer(step){
    // based on where the avail offer is clicked from, called different functions/process

    switch (step) {
        case 'step3-1':
            // case of Annual Fee Waiver
            showNextStep('step4-1','step3-1');
            break;
        case 'step3-2':
            // case of Low Credit Limit
            $('#redirect-modal').show();
            break;            
        case 'step3-3':
            // case of Change Billing Cycle
            // show step 4 of more offers
            showNextStep('step4-3','step3-3');
            break;
        case 'step3-4':
            // case of no Offers
            // show step 4 of more offers
            showNextStep('step4-4','step3-4');            
            break;
        case 'step3-5':
            // case of other fees and charges
            // show step 4 of more offers
            showNextStep('step4-5','step3-5');            
            break;
        case 'step4-4':
            // case for step 4 More offers in  "no offers"
            const selectedOffer = $('input[name="more-offers-radio"]:checked').val();
            // write what else happens here
            showNextStep('step5','step4-4');
            break;
        case 'step4-3':
            // case for step 4 change billing cycle in  "billing cycle issues."
            
            // write what else happens here
            showNextStep('step5','step4-3');
            break;
        default:
            break;
    }
}


function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
     except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
 then close all select boxes: */
document.addEventListener("click", closeAllSelect);
