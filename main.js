var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var first_card_div_element = null;
var second_card_div_element = null;
var noMatch = false;

function card_clicked(card_element) {

    console.log("card_element is " + card_element);
    $(card_element).addClass('hidden_cards');
    var front_card = $(card_element).prev().find('img');
    var first_front_card_image = $(front_card).attr('src');
    console.log('first_front_card_image IS ' + first_front_card_image);
    if (first_card_clicked == null) {
        console.log('this is the first card we clicked');
        first_card_div_element = card_element;
        first_card_clicked = first_front_card_image;
        console.log('first card clicked is ' + first_card_clicked);
    }
    else {
        console.log('this is the second card we clicked');
        second_card_div_element = card_element;
        var second_card = $(card_element).prev().find('img');
        var second_front_card_image = $(second_card).attr('src');
        console.log('second_front_card_image is ' + second_front_card_image);
        second_card_clicked = second_front_card_image;
        console.log('second_card_clicked equals ' + second_card_clicked);
        console.log('first card clicked equals ' + first_card_clicked);
        if (first_card_clicked == second_card_clicked) {
            console.log('Is it a match? Yes it is ' + (first_card_clicked == second_card_clicked));
            match_counter += 1;
            console.log('match_counter value is ' + match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            console.log('first_card_clicked, second_card_clicked is now... ' + first_card_clicked + ', ' + second_card_clicked + ' AGAIN.')
            if (match_counter == total_possible_matches) {
                console.log('you win!');
                console.log(alert('you win!'));
            }
            else {
                console.log('pick another pair!');
            }
        }
        else {
            console.log('Is it a match? No it is ' + (first_card_clicked == second_card_clicked));
            setTimeout(function() {
                $(first_card_div_element).removeClass('hidden_cards'); $(second_card_div_element).removeClass('hidden_cards');
            }, 3000);
            first_card_clicked = null;
            second_card_clicked = null;

        }
    }
}