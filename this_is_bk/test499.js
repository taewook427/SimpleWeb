let count = 0;

document.getElementById("genbut").addEventListener("click", function() {
    document.getElementById("say4").innerHTML = "";
    count = count + 1;
    pre();
});

function pre() {
    let num0 = 0;
    let num1 = 0;
    let num2 = 0;
    
    for (i = 0; i < 40; i++) {
        setTimeout(function() { num0 = say0() }, 50 * i);
        setTimeout(function() { num1 = say1() }, 50 * i);
        setTimeout(function() { num2 = say2() }, 50 * i);
        setTimeout(function() {say3( num0 + num1 + num2) }, 50 * i + 50);
        }
    for (i = 0; i < 20; i++) {
        setTimeout(function() { num0 = say0() }, 2000 + 100 * i);
        setTimeout(function() { num1 = say1() }, 2000 + 100 * i);
        setTimeout(function() {say3( num0 + num1 + num2) }, 2000 + 100 * i + 50);
        }
    for (i = 0; i < 8; i++) {
        setTimeout(function() { num0 = say0() }, 4000 + 250 * i);
        setTimeout(function() {say3( num0 + num1 + num2) }, 4000 + 250 * i + 50);
        }

    setTimeout(function() { say3(num0 + num1 + num2); say4(num0, num1, num2) }, 6250);
    }

function say0() {
    // 목록
    let data = ["알았니 얘들아", "듣고있니", "안녕 얘들아", "에헤이", "오늘 수업 여기까지",
                "자 앉아보세요", "표현력!", "삼분의일 법칙", "불광동", "공부안해~?",
                "여러분 맞습니까?", "맞니 얘들아", "주옥같은 기출문제", "여러분 이러면 안됩니다", "자 문제 한번 풀어보세요",
                "교과서 수준 문제", "장애인 전형으로 가면 되겠네", "너 평생 아웃이야!", "관심받고싶어?", "자기관리를 안해서 기흉이 오는거야",
                "어차피 수학점수 안나오잖아~", "난 이런건 수학으로 안 친다", "에헤이 공부안할거야~?", "관심좀줘라 애가 애정결핍이야", "부릉부릉 돌콩이",
                "표현력이 중요합니다", "따라오니", "역시 삼성! 이게 다 기술력이지", "선생님이 뭐라했습니까", "수능 못봐도 재수하면 돼~"];
    let num = Math.floor(Math.random() * data.length);
    document.getElementById("say0").innerHTML = data[num];
    return num / (data.length - 1);
    }

function say1() {
    // 목록
    let data = ["알았니 얘들아", "듣고있니", "안녕 얘들아", "에헤이", "오늘 수업 여기까지",
                "자 앉아보세요", "표현력!", "삼분의일 법칙", "불광동", "공부안해~?",
                "여러분 맞습니까?", "맞니 얘들아", "주옥같은 기출문제", "여러분 이러면 안됩니다", "자 문제 한번 풀어보세요",
                "교과서 수준 문제", "장애인 전형으로 가면 되겠네", "너 평생 아웃이야!", "관심받고싶어?", "자기관리를 안해서 기흉이 오는거야",
                "어차피 수학점수 안나오잖아~", "난 이런건 수학으로 안 친다", "에헤이 공부안할거야~?", "관심좀줘라 애가 애정결핍이야", "부릉부릉 돌콩이",
                "표현력이 중요합니다", "따라오니", "역시 삼성! 이게 다 기술력이지", "선생님이 뭐라했습니까", "수능 못봐도 재수하면 돼~"];
    let num = Math.floor(Math.random() * data.length);
    document.getElementById("say1").innerHTML = data[num];
    return num / (data.length - 1);
    }

function say2() {
    // 목록
    let data = ["알았니 얘들아", "듣고있니", "안녕 얘들아", "에헤이", "오늘 수업 여기까지",
                "자 앉아보세요", "표현력!", "삼분의일 법칙", "불광동", "공부안해~?",
                "여러분 맞습니까?", "맞니 얘들아", "주옥같은 기출문제", "여러분 이러면 안됩니다", "자 문제 한번 풀어보세요",
                "교과서 수준 문제", "장애인 전형으로 가면 되겠네", "너 평생 아웃이야!", "관심받고싶어?", "자기관리를 안해서 기흉이 오는거야",
                "어차피 수학점수 안나오잖아~", "난 이런건 수학으로 안 친다", "에헤이 공부안할거야~?", "관심좀줘라 애가 애정결핍이야", "부릉부릉 돌콩이",
                "표현력이 중요합니다", "따라오니", "역시 삼성! 이게 다 기술력이지", "선생님이 뭐라했습니까", "수능 못봐도 재수하면 돼~"];
    let num = Math.floor(Math.random() * data.length);
    document.getElementById("say2").innerHTML = data[num];
    return num / (data.length - 1);
    }

function say3(score) {
    document.getElementById("say3").innerHTML = "score : " + (score * 100 / 3).toFixed(1) + "/100.0";
    }

function say4(num0, num1, num2) {
    let word = "";
    let score = (num0 + num1 + num2) * 100 / 3;
    if (score < 20) {
        word = "너는 수학에 재능이 없구나~";
        }
    if (score > 75) {
        word = "여러분 이래가지고는 1등급 안나옵니다~";
        }
    if (score > 90) {
        word = "당신을 명예 BK로 인정합니다";
        }
    if (count == 10) {
        word = "벌써 10회나 표현했니~ 맞니?";
        }
    if (count == 50) {
        word = "표현력! 50배!! 상승!!!";
        }
    if (count == 250) {
        word = "슬슬 잭팟 나올때가 됐지";
        }
    if (count == 1000) {
        word = "1000번이나 했어! 공부안해~?";
        }
    if ( ( num0.toFixed(1) == num1.toFixed(1) ) && ( num1.toFixed(1) == num2.toFixed(1) ) ) {
        word = "잭팟!!!!! 이게되네ㄷㄷㄷ";
        }
    document.getElementById("say4").innerHTML = word;
    }
