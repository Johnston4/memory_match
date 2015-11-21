var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var first_card_div_element = null;
var second_card_div_element = null;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var can_i_click_other_cards = true;
var card_array = [];
var card_back_src = '';
$(document).ready(function () {
    howl_card_img_srcs();
    display_stats();

});

function card_clicked(card_element) {
    if (!can_i_click_other_cards) {
        return;
    }
    console.log('Can I click other cards? ' + can_i_click_other_cards);
    console.log("card_element is " + card_element);
    $(card_element).addClass('hidden_cards');
    var front_card = $(card_element).parent().prev().children();
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
        attempts += 1;
        console.log('number of attempts:' + attempts);
        display_stats();
        second_card_div_element = card_element;
        var second_card = $(card_element).parent().prev().children();
        var second_front_card_image = $(second_card).attr('src');
        console.log('second_front_card_image is ' + second_front_card_image);
        second_card_clicked = second_front_card_image;
        console.log('second_card_clicked equals ' + second_card_clicked);
        console.log('first card clicked equals ' + first_card_clicked);

        if (first_card_clicked == second_card_clicked) {
            console.log('Is it a match? Yes it is ' + (first_card_clicked == second_card_clicked));
            match_counter += 1;
            matches += 1;
            console.log('MATCH is: ' + matches);
            console.log('match_counter value is ' + match_counter);
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;
            console.log('first_card_clicked, second_card_clicked is now... ' + first_card_clicked + ', ' + second_card_clicked + ' AGAIN.');
            if (match_counter == total_possible_matches) {
                console.log('you win!');
                games_played += 1;
                console.log('games played: ' + games_played);
                display_stats();
                console.log(alert('you win!'));
                reset_stats();
                reset_cards()
            }
            else {
                console.log('pick another pair!');
            }
        }
        else {
            console.log('Is it a match? No it is ' + (first_card_clicked == second_card_clicked));
            can_i_click_other_cards = false;
            console.log('Can I click other cards? ' + can_i_click_other_cards);
            setTimeout(function () {
                can_i_click_other_cards = true;
                $(first_card_div_element).removeClass('hidden_cards');
                $(second_card_div_element).removeClass('hidden_cards');
            }, 500);
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
}

function display_stats() {

    $('#games_played_stat').text(games_played);
    $('#attempts_stat').text(attempts);
    console.log('number of attempts: ' + attempts);

    var accuracy_calculation = (matches / attempts) * 100;
    accuracy = parseInt(accuracy_calculation);
    if (attempts == 0) {
        accuracy = 0;
    }
    $('#accuracy_stat').text((accuracy) + '%');
    console.log('number of accuracy IS ', accuracy);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
    reset_cards();
}

function reset_clicked() {
    if (match_counter != total_possible_matches) {
        games_played += 1;
    }
    reset_stats();
    display_stats();
}

function reset_cards() {
    $('#game-area').empty();
    dynamic_board_loop();
}

function chibi_card_img_srcs() {
    $('body').css('background', 'url("chibi-match/chibi-background.jpg")');

    card_array = [];
    reset_stats();
    for (var i = 0; i < 2; i++) {
        card_array.push('chibi-match/ashitaka.jpg', 'chibi-match/catbus.jpg', 'chibi-match/haku.jpg', 'chibi-match/howl.jpg', 'chibi-match/jiji.jpg', 'chibi-match/mononoke.jpg', 'chibi-match/ponyo.jpg', 'chibi-match/shishigami.jpg', 'chibi-match/susuwatari.jpg');
    }
    $('#game-area').empty().css('background-color', 'rgba(0,89,178, .8)');
    card_back_src = 'chibi-match/ghibli.jpg';
    dynamic_board_loop();
}

function howl_card_img_srcs() {
    $('body').css('background', 'url("images/howl-background-lg2.jpg")');
    card_array = [];
    reset_stats();
    for (var i = 0; i < 2; i++) {
        card_array.push('images/sophie.jpg', 'images/howl.jpg', 'images/howls-castle.jpg', 'images/markl.jpg', 'images/sophie-old.jpg', 'images/turnip-head.png', 'images/witch.jpg', 'images/heen-dog.jpg', 'images/calcifer-fire.jpg');
        console.log('card_array: ', card_array);
    }
    $('#game-area').empty().css('background-color', 'rgba(0, 0, 0, .8)');
    card_back_src = 'images/woodcard.jpg';
    dynamic_board_loop();
}

function dynamic_board_loop() {
    first_card_clicked = null;
    second_card_clicked = null;
    var num_columns = 6;
    var cards_per_column = 3;
    var random_array_indices = [];
    for (var i = 0; i < card_array.length; i++) {
        random_array_indices.push(i);
    }
    for (var i = 0; i < num_columns; i++) {
        var column = $('<div>').addClass('col-xs-1 column');
        $(column).appendTo('#game-area');
        for (var j = 0; j < cards_per_column; j++) {
            var random_index = Math.floor((Math.random() * random_array_indices.length));
            var front_img = $('<img>').addClass("card-front").attr('src', card_array[random_array_indices[random_index]]);
            random_array_indices.splice(random_index, 1);
            var back_img = $('<img>', {
                class: 'card-back',
                src: card_back_src,
                onclick: "card_clicked(this)"
            });
            var front_div = $('<div>').addClass('front');
            var back_div = $('<div>').addClass('back');
            var card = $('<div>').addClass('card');
            $(front_img).appendTo(front_div);
            $(back_img).appendTo(back_div);
            $(front_div).appendTo(card);
            $(back_div).appendTo(card);
            $(card).appendTo(column);
        }
    }
}