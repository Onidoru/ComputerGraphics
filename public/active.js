var checkbox = document.getElementById('checkbox');
var content = document.getElementById('lab_mode');

var eq_x = document.getElementById('eq_x');
var eq_y = document.getElementById('eq_y');

var a = document.getElementById('range_a').value;
var b = document.getElementById('range_b').value;
var n = document.getElementById('range_orn').value;
var r = document.getElementById('range_r').value;

var prev_eq_x;
var prev_eq_y;

checkbox.onclick = function() {
    eq_x.readOnly = checkbox.checked;
    eq_y.readOnly = checkbox.checked;

    if (this.checked) {
        content.style.display = 'block';

        prev_eq_x = eq_x.value;
        prev_eq_y = eq_y.value;

        eq_x.value = '(A*R/B)*cos(t/B)+(R/B)*cos(A*t/B)';
        eq_y.value = '(A*R/B)*sin(t/B)-(R/B)*sin(A*t/B)';

    } else {
        eq_x.value = prev_eq_x;
        eq_y.value = prev_eq_y;
        content.style.display = 'none';
    }
}

function updateValues(event) {
    n = document.getElementById('range_orn');
    checkInput(event);

    if (checkbox.checked) {
        a = document.getElementById('range_a').value;
        b = document.getElementById('range_b').value;
        r = document.getElementById('range_r').value;

        r_b = r / b;
        a_b = a / b;
        a_r_b = a * r_b;

        b = String(b);
        r_b = String(r_b);
        a_b = String(a_b);
        a_r_b = String(a_r_b);

        updateEqXInput();
        updateEqYInput();
    }

    onUpdate(event);
}

function checkInput(event) {
    var input = String(eq_x.value) + String(eq_y.value);

    pattern = new RegExp(/^[A-Za-z0-9 _()+-/*^]*$/);

    flag = pattern.test(input);

    if (flag == false) {
        event.preventDefault();
        alert(
            "Only English characters & simple math are allowed!"
        );
    }
}


// Impulse effect
make_effect.onclick = function(event) {
    if (this.checked) {
        timer = setInterval(function() {
            n = document.getElementById('range_orn').value;

            if (n == 9) increase = false;
            else if (n == 1) increase = true;

            increase ? n++ : n--;

            document.getElementById('range_orn').value = n;
            updateValues(event);
        }, 50);
    } else {
        clearInterval(timer);
    }
}

// In order to draw a plot, String values must be given to function-plot.js

function updateEqXInput() {
    eq_x.value = a_r_b + '*cos(t/' + b + ')' + '+' + r_b + '*cos(t*' + a_b + ')';
}

function updateEqYInput() {
    eq_y.value = a_r_b + '*sin(t/' + b + ')' + '-' + r_b + '*sin(t*' + a_b + ')';
}

function makeEffect(event) {

}
