var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;

function card_clicked(card_element){
    var back_face = $(card_element).find('.back');
    $(back_face).toggle();
}