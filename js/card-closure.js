$(document).ready(function(){
var isAddonGlobal = false;

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
                            removeOpenedSteps();
                            document.querySelector('#step2 .select-selected').setAttribute("data-next", this.dataset.next);
                            document.querySelector('#step2 .select-selected').setAttribute("data-current", 'step2'); 
                            document.querySelector('#reason-select-button').classList.remove('disabled') 
                            resetTermsCheckbox();                           
                            $('.select-reson-cnt.others').hide();
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
        case 'step1':
            $('.main-wrap#step1 .sub-heading ').text(selectionText)
            break;
        case 'step2':
            $('.main-wrap#step2 .sub-heading').text(selectionText)
            $('#closure-readon').text(selectionText)
            break;
    
        default:
            break;
    }
}
function removeOpenedSteps(){
    $('.main-wrap.my-profile.step-3-wrapp').removeClass('filled');    
    $('.main-wrap.my-profile.step-3-wrapp').removeClass('active');   
    $('.main-wrap.my-profile.step-3-wrapp').addClass('hidden');   
    $('.main-wrap.my-profile.step-4-wrapp').removeClass('filled');    
    $('.main-wrap.my-profile.step-4-wrapp').removeClass('active');   
    $('.main-wrap.my-profile.step-4-wrapp').addClass('hidden');
    $('.main-wrap.my-profile.step-5-wrapp').removeClass('filled');    
    $('.main-wrap.my-profile.step-5-wrapp').removeClass('active');   
    $('.main-wrap.my-profile.step-5-wrapp').addClass('hidden');   
}
function showNextStep(nextStep,currentStep,isAddon) {

    if(isAddon!=undefined) isAddonGlobal = isAddon;

    // hide other steps of 3rd category
    const nextStepDashIndex = nextStep.indexOf('-')
    if(nextStep.substr(0,nextStepDashIndex) == 'step3'){
        // all step 3s
        // if(isAddonGlobal){
        //     $('#step3-addon').removeClass('hidden');
        //     $('#step3-addon').addClass('active');
        //     $('#step3-addon').find(".mumer-heading").addClass("toggle");
        //     if(currentStep){
        //         $('.main-wrap.my-profile#'+currentStep).addClass('filled');    
        //         $('.main-wrap.my-profile#'+currentStep).removeClass('active');
        //         $('.select-reson-cnt.others').hide();    
        //     }
        //     return
        // }else{
            $('.main-wrap.step-3-wrapp.active').addClass('hidden');
            $('.main-wrap.step-3-wrapp.active').removeClass('active');
        // }
    }

    // hide current Step if it exists
    // expect when others i,e. step3-6 is chosen
    if(nextStep != "step3-6"){
        $('.select-reson-cnt.others').hide();
    }
    if(currentStep){
        $('.main-wrap.my-profile#'+currentStep).addClass('filled');    
        $('.main-wrap.my-profile#'+currentStep).removeClass('active');
        $('.select-reson-cnt.others').hide();    
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

// function validateForm(el,formId){
//     console.log(el);
//     console.log(formId);
//     if(el.checked){
//         $("#" +formId + ' .e-sign-button').removeClass('gray-btn');
//         $("#" +formId + ' .e-sign-button').addClass('tick-active');
//     }else{
//         $("#" +formId + ' .e-sign-button').addClass('gray-btn');
//         $("#" +formId + ' .e-sign-button').removeClass('tick-active');
//     }
// }

function handleStepChange(step,isAvail,currentStepOverride){
    // based on where the avail or skip is clicked from, called different functions/process

    switch (step) {
        case 'step1':
            const selectCardType = $('input[name=card-group]:checked').val();
            showNextStep('step2','step1',selectCardType === 'addon')
            if(selectCardType === 'addon'){
                const selectedAddonCard = document.querySelector('#step1 .select-selected');
                displaySelection("step1","Add On Card: " + selectedAddonCard.innerHTML);
            }else{
                // handle card number properly hard coding here
                displaySelection("step1","Primary Card: " + "XXXX-2345");
            }
            break;
        case 'step2':
            const selectedReason = document.querySelector('#step2 .select-selected');            
            displaySelection("step2",selectedReason.innerHTML);
            if(selectedReason.dataset.next == 'step3-6'){
                if(document.querySelector('textarea.others-text').value.length>3){
                    showNextStep('step4-4',selectedReason.dataset.current);
                }else{
                    document.querySelector('.select-reson-cnt.others').style.display
                    document.querySelector('#reason-select-button').classList.add('disabled')
                    $('.select-reson-cnt.others').show();
                }
            }
            else if(selectedReason.dataset.next == 'step3-7' && isAddonGlobal){      
                showNextStep('step3-addon',selectedReason.dataset.current);          
            }
            else{
                showNextStep(selectedReason.dataset.next,selectedReason.dataset.current);
            }
            changeNumberOnActiveStep()
            break;
        case 'step3-1':
            // case of Annual Fee Waiver
            if(isAvail){
                window.location.pathname = "../success-sr-fees.html"
                break;
            }
            showNextStep('step4-4',currentStepOverride?currentStepOverride:'step3-1');
            changeNumberOnActiveStep()
            break;
        case 'step3-2':
            // case of Low Credit Limit
            if(isAvail){
                $('#redirect-modal').show();
                break;
            }
            showNextStep('step4-4','step3-2');
            break;            
        case 'step3-3':
            if(isAvail){
                showNextStep('step4-3',currentStepOverride?currentStepOverride:'step3-3');
                break
            }
            showNextStep('step4-4','step3-3');
            // case of Change Billing Cycle
            break;
        case 'step3-4':
            // case of no Offers
            // show step 4 of more offers
            showNextStep('step4-4','step3-4');            
            break;
        case 'step3-5':
            // case of other fees and charges
            // show step 4 of more offers
            if(isAvail){
                showNextStep('step4-5',currentStepOverride?currentStepOverride:'step3-5');            
                break
            }
            showNextStep('step4-4','step3-5');            
            break;
        case 'step3-6':
            if(isAvail){
                const selectedOffer = $('input[name="some-offers-radio"]:checked').val();
                handleOfferSelection(selectedOffer)
                changeNumberOnActiveStep()
                break;
            }
            showNextStep('step4-others','step3-6');
            break;
        case 'step3-7':
            // case of low card usage
            showNextStep('step5','step3-7');
            changeNumberOnActiveStep();
            break;
        case 'step4-4':
            // case for step 4 More offers in  "no offers"
            if(isAvail){
                const selectedOffer = $('input[name="more-offers-radio"]:checked').val();
                handleOfferSelection(selectedOffer)
                break;
            }
            // write what else happens here
            showNextStep('step5','step4-4');
            resetTermsCheckbox()
            break;
        case 'step4-3':
            // case for step 4 change billing cycle in  "billing cycle issues."
            
            // write what else happens here
            showNextStep('step5','step4-3');
            resetTermsCheckbox()
            break;
        case 'step3-addon':
            // case for confirm for add on
            
            // write what else happens here
            showNextStep('step4-addon','step3-addon');
            break;
        
        default:
            break;
    }
}

function resetTermsCheckbox() {
    document.querySelector('#step5 .e-sign-button').classList.add('disabled')
    document.querySelector('#step4-others .e-sign-button').classList.add('disabled')
    document.querySelector('#terms-form-confirm-4 .e-sign-button').classList.add('disabled')
    document.querySelector('#step5 #terms_conditions_step5').checked = false;
    document.querySelector('#step4-others #terms_conditions_step5').checked = false;
    document.querySelector('#terms-form-confirm-4 input').checked = false;
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
function changeNumberOnActiveStep(){
    const activeSteps = document.querySelectorAll('.main-wrap.my-profile.active .number-count.numeric');
    const lastFilledStep = document.querySelectorAll('.main-wrap.my-profile.filled .number-count.numeric');
    activeSteps[activeSteps.length-1].innerHTML = parseInt(lastFilledStep[lastFilledStep.length-1].innerHTML) + 1;
}
function handleOfferSelection(selection){
    switch (selection) {
        case "annual-fee-waiver":
            handleStepChange('step3-1',true);
            break;
        case "fee-reversal":
            handleStepChange('step3-5',true,'step4-4');
            // make it step 5 in html
            changeNumberOnActiveStep()
            break;
        case "credit-limit-increase":
            handleStepChange('step3-2',true);
            break;
        case "get-reward-points":
            // handleStepChange('step3-1');
            break;
        case "change-billing-cycle":
            handleStepChange('step3-3',true,'step4-4')
            changeNumberOnActiveStep(5)
            break;
        case "card-features-and-offers":
            handleStepChange('step3-1');
            break;
        default:
            break;
    }
}
/* If the user clicks anywhere outside the select box,
 then close all select boxes: */
document.addEventListener("click", closeAllSelect);
