// div에서 입력을 가져오는 함수
function getinfo(num) {
    const inputDiv = document.getElementById( 'in' + num.toString() );
    const lectureName = inputDiv.querySelector('input[type="text"]').value;
    const building = inputDiv.querySelector('select').value;
    const roomNumber = parseInt(inputDiv.querySelectorAll('input[type="number"]')[0].value);
    const registeredStudents = parseInt(inputDiv.querySelectorAll('input[type="number"]')[1].value);
    return [lectureName, building, roomNumber, registeredStudents];
}

// 강의명, 담은수, 정원 -> 중간 결과
function calc0(name, reg, cap) {
    num = reg / cap
    ts = name + "-> 담은수/정원 : " + (num).toString().substring(0, 4)
    ts = ts + ", 정원 보정 : " + (num / 0.8).toString().substring(0, 4)
    ts = ts + ", 담은수 보정 : " + (num * 0.9).toString().substring(0, 4)
    return ts;
}

// 강의명, 담은수, 정원 -> 최종 결과
function calc1(name, reg, cap) {
    num = (reg * 0.9) / (cap * 0.8)
    if (num < 1.1) {
        ts = name + "-> 후순위"
    } else if (num < 1.7) {
        ts = name + "-> 중간픽"
    } else {
        ts = name + "-> 1픽급"
    }
    return ts;
}

// 중간 결과 출력
function dis0(message) {
    const outputElement = document.getElementById('output0');
    outputElement.innerHTML = message;
}

// 최종 결과 출력
function dis1(message) {
    const outputElement = document.getElementById('output1');
    outputElement.innerHTML = message;
}

// 강의 건물과 호수에 따라 정원을 반환하는 함수
function getcap(build, room) {
    // 자A
    td00 = [102, 201, 202, 301, 302, 303, 305, 307, 308, 309, 310, 311, 314, 315, 316, 317, 320, 321, 322, 323, 324, 401, 402, 403, 405, 406, 407, 408]
    td01 = [156,  80,  80,  60,  46,  48,  70,  30,  30,  30,  30,  50,  30,  30,  30,  30,  60,  70,  50,  50,  30,  60,  50,  80,  30,  30,  30,  30]
    d00 = td00.concat( [410, 411, 412, 415, 416, 426, 427, 428, 429, 430, 431, 432, 433, 434, 521, 523, 524, 525] )
    d01 = td01.concat( [ 30,  30,  30,  30,  30,  40,  40,  40,  60,  60,  30,  30,  30,  30,  80,  60,  40,  60] )
    // 자B
    d10 = [202]
    d11 = [240]
    // 진A
    td20 = [101, 105, 106, 107, 108, 109, 110, 201, 202, 203, 212, 216, 217, 218, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310]
    td21 = [210, 138,  40,  40, 115,  24,  53,  65,  63,  40,  28,  50,  55,  80,  84,  74, 393,  18,  14,  30,  30,  15,  24,  53]
    d20 = td20.concat( [311, 401, 402, 403, 404, 405, 406, 407, 408, 410, 411] )
    d21 = td21.concat( [  8,  60,  29,  30,  10,  12,  24,  30,  30,  24,  53] )
    // 진B
    d30 = [204, 207, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 314, 315, 316, 317, 318, 319, 320, 323, 324, 439, 440]
    d31 = [ 50,  30,  80,  40,  40,  40,  30,  30,  40,  40,  22,  20,  40,  40,  30,  40,  80,  50,  50,  30,  35,  50,  50]
    // 종합관
    d40 = [201, 207, 211, 313, 314]
    d41 = [ 50,  30,  30,  20,  20]
    if (build == "자a") {
        key = d00
        value = d01
    } else if (build == "자b") {
        key = d10
        value = d11
    } else if (build == "진a") {
        key = d20
        value = d21
    } else if (build == "진b") {
        key = d30
        value = d31
    } else if (build == "종") {
        key = d40
        value = d41
    } else {
        key = [0]
        value = [-1]
    }
    for (let i = 0; i < key.length; i++) {
        if (key[i] == room) {
            return value[i]
        }
    }
    return -1
}

// 경쟁률 계산
document.getElementById("calc").addEventListener("click", function() {
    t0 = "=== 중간 결과 ===<br>"
    t1 = "=== 최종 결과 ===<br>"
    for (let i = 0; i < 10; i++) {
        temp = getinfo(i)
        if (temp[0] != "") {
            tn = getcap(temp[1], temp[2])
            t0 = t0 + calc0(temp[0], temp[3], tn) + "<br>"
            t1 = t1 + calc1(temp[0], temp[3], tn) + "<br>"
        }
    }
    dis0(t0)
    dis1(t1)
} );