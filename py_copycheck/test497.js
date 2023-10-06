document.getElementById("calculateButton").addEventListener("click", function() {
    // 두 개의 코드를 가져옵니다.
    let code1 = document.getElementById("code1").value;
    let code2 = document.getElementById("code2").value;
            
    // 코드를 비교하고 일치도를 계산합니다.
    // 결과는 0 ~ 100 실수
    let sim0 = calc0(code1, code2) * 0.2;
    let sim1 = calc1(code1, code2) * 0.3;
    let sim2 = calc2(code1, code2) * 0.3;
    let sim3 = calc3(code1, code2) * 0.2;

    // 숫자 소숫점 반올림
    let total_sim = sim0 + sim1 + sim2 + sim3;
    total_sim = total_sim.toFixed(2);
    sim0 = sim0.toFixed(2);
    sim1 = sim1.toFixed(2);
    sim2 = sim2.toFixed(2);
    sim3 = sim3.toFixed(2);
            
    // 결과를 표시합니다.
    let res = "두 코드의 일치도: " + total_sim + "%";
    let acc = "상세정보 : 변수명(" + sim0 + "/20.00) 연산자 구조 (" + sim1 + "/30.00) 제어 구조 (" + sim2 + "/30.00) 자체 동일성 (" + sim3 + "/20.00)";
    document.getElementById("result").innerHTML = res;
    document.getElementById("accurate").innerHTML = acc;
});

function redux(instr) {
    // 대문자를 모두 소문자로 변환하고 영문 소문자와 숫자만 남기고 나머지 문자 제거
    let res = instr.toLowerCase().replace(/[^a-z0-9]/g, '');
    return res;
}

function calc0(code1, code2) {
    // 문자열을 줄바꿈 문자('\n')를 기준으로 분할하여 배열로 반환
    let lines1 = code1.split('\n');
    let lines2 = code2.split('\n');

    // 변수명 배열
    let vars1 = [ ];
    let vars2 = [ ];

    // 단일 = 앞, def 뒤, class 뒤
    for (i = 0; i < lines1.length; i++) {
        let temp = lines1[i];
        
        let esign = temp.indexOf('=');
        if (temp[esign + 1] == "=") {
            esign = -1;
            }
        if (esign != -1) {
            temp = temp.substring(0, esign).trim();
            temp = redux(temp);
            if (vars1.indexOf(temp) == -1) {
                vars1.push(temp);
                }
            }
        else {
            let fsign = temp.indexOf('def');
            if (fsign == -1) {
                fsign = temp.indexOf('class');
                }
            if (fsign != -1) {
                temp = temp.substring(fsign, temp.length);
                let startsign = temp.indexOf(' ');
                if (startsign == -1) {
                    startsign = 0;
                    }
                let endsign = temp.indexOf('(');
                if (endsign == -1) {
                    endsign = temp.length;
                    }
                temp = temp.substring(startsign, endsign).trim();
                temp = redux(temp);
                if (vars1.indexOf(temp) == -1) {
                    vars1.push(temp);
                    }
                }
            }
        }
    for (i = 0; i < lines2.length; i++) {
        let temp = lines2[i];
        
        let esign = temp.indexOf('=');
        if (temp[esign + 1] == "=") {
            esign = -1;
            }
        if (esign != -1) {
            temp = temp.substring(0, esign).trim();
            temp = redux(temp);
            if (vars2.indexOf(temp) == -1) {
                vars2.push(temp);
                }
            }
        else {
            let fsign = temp.indexOf('def');
            if (fsign == -1) {
                fsign = temp.indexOf('class');
                }
            if (fsign != -1) {
                temp = temp.substring(fsign, temp.length);
                let startsign = temp.indexOf(' ');
                if (startsign == -1) {
                    startsign = 0;
                    }
                let endsign = temp.indexOf('(');
                if (endsign == -1) {
                    endsign = temp.length;
                    }
                temp = temp.substring(startsign, endsign).trim();
                temp = redux(temp);
                if (vars2.indexOf(temp) == -1) {
                    vars2.push(temp);
                    }
                }
            }
        }
    
    let same = 0;
    for (i = 0; i < vars1.length; i++) {
        if (vars2.indexOf( vars1[i] ) != -1) {
            same = same + 1
            }
        }
    let similarity = (2 * same) / (vars1.length + vars2.length) * 100;
    return similarity;
}

function calc1(code1, code2) {
    // 문자열을 줄바꿈 문자('\n')를 기준으로 분할하여 배열로 반환
    let lines1 = code1.split('\n');
    let lines2 = code2.split('\n');

    // 공백 또는 탭만 존재하는 배열 삭제
    lines1 = lines1.map(item => item.replace(/[\s\t]/g, ''));
    lines2 = lines2.map(item => item.replace(/[\s\t]/g, ''));

    // 연산자만 남기기
    let opers = ["+", "-", "*", "/", "%", "(", ")", "{", "}", "[", "]", "=", "<", ">", ",", ".", "!", "'", '"'];
    for (i = 0; i < lines1.length; i++) {
        let temp = lines1[i];
        let newstr = "";
        for (j = 0; j < temp.length; j++) {
            if (opers.indexOf( temp[j] ) != -1) {
                newstr = newstr + temp[j];
                }
            }
        lines1[i] = newstr;
        }
    for (i = 0; i < lines2.length; i++) {
        let temp = lines2[i];
        let newstr = "";
        for (j = 0; j < temp.length; j++) {
            if (opers.indexOf( temp[j] ) != -1) {
                newstr = newstr + temp[j];
                }
            }
        lines2[i] = newstr;
        }

    // 빈 문자열은 지우기
    for (i = 0; i < lines1.length; i++) {
        if (lines1[i] === "") {
            lines1.splice(i, 1);
        }
    }
    for (i = 0; i < lines2.length; i++) {
        if (lines2[i] === "") {
            lines2.splice(i, 1);
        }
    }

    // 각 코드 배열에 대해 근처 동일 코드 감지
    let num1 = 0;
    let arrsize = lines2.length;
    for (i = 0; i < lines1.length; i++) {
        let temp = lines1[i];
        if ( (i - 2 >= 0) && (i - 2 < arrsize) ) {
            if (lines2[i - 2] == temp) {
                num1 = num1 + 1;
                continue;
                }
            }
        if ( (i - 1 >= 0) && (i - 1 < arrsize) ) {
            if (lines2[i - 1] == temp) {
                num1 = num1 + 1;
                continue;
                }
            }
        if ( (i >= 0) && (i < arrsize) ) {
            if (lines2[i] == temp) {
                num1 = num1 + 1;
                continue;
                }
            }
        if ( (i + 1 >= 0) && (i + 1 < arrsize) ) {
            if (lines2[i + 1] == temp) {
                num1 = num1 + 1;
                continue;
                }
            }
        if ( (i + 2 >= 0) && (i + 2 < arrsize) ) {
            if (lines2[i + 2] == temp) {
                num1 = num1 + 1;
                continue;
                }
            }
        }
    let num2 = 0;
    arrsize = lines1.length;
    for (i = 0; i < lines2.length; i++) {
        let temp = lines2[i];
        if ( (i - 2 >= 0) && (i - 2 < arrsize) ) {
            if (lines1[i - 2] == temp) {
                num2 = num2 + 1;
                continue;
                }
            }
        if ( (i - 1 >= 0) && (i - 1 < arrsize) ) {
            if (lines1[i - 1] == temp) {
                num2 = num2 + 1;
                continue;
                }
            }
        if ( (i >= 0) && (i < arrsize) ) {
            if (lines1[i] == temp) {
                num2 = num2 + 1;
                continue;
                }
            }
        if ( (i + 1 >= 0) && (i + 1 < arrsize) ) {
            if (lines1[i + 1] == temp) {
                num2 = num2 + 1;
                continue;
                }
            }
        if ( (i + 2 >= 0) && (i + 2 < arrsize) ) {
            if (lines1[i + 2] == temp) {
                num2 = num2 + 1;
                continue;
                }
            }
        }

    let similarity = (num1 + num2) / (lines1.length + lines2.length) * 100;
    return similarity;
}

function calc2(code1, code2) {
    // 문자열을 줄바꿈 문자('\n')를 기준으로 분할하여 배열로 반환
    let lines1 = code1.split('\n');
    let lines2 = code2.split('\n');

    // 공백 또는 탭만 존재하는 배열 삭제
    lines1 = lines1.map(item => item.replace(/[\s\t]/g, ''));
    lines2 = lines2.map(item => item.replace(/[\s\t]/g, ''));

    // 빈 문자열은 지우기
    for (i = 0; i < lines1.length; i++) {
        if (lines1[i] === "") {
            lines1.splice(i, 1);
        }
    }
    for (i = 0; i < lines2.length; i++) {
        if (lines2[i] === "") {
            lines2.splice(i, 1);
        }
    }

    // 제어 구조 배열 생성
    let construct = ["def", "class", "while", "for", "if", "elif", "else"];
    let struct1 = [ ];
    for (i = 0; i < lines1.length; i++) {
        let temp = lines1[i];
        if (temp.indexOf(':') != -1){
            for (j = 0; j < construct.length; j++) {
                if (temp.indexOf( construct[j] ) != -1) {
                    struct1.push( construct[j] );
                    break;
                    }
                }
            }
        else {
            struct1.push("");
            }
        }
    let struct2 = [ ];
    for (i = 0; i < lines2.length; i++) {
        let temp = lines2[i];
        if (temp.indexOf(':') != -1){
            for (j = 0; j < construct.length; j++) {
                if (temp.indexOf( construct[j] ) != -1) {
                    struct2.push( construct[j] );
                    break;
                    }
                }
            }
        else {
            struct2.push("");
            }
        }

    // 5줄이 안 된다면 빈칸 추가
    if (struct1.length < 5) {
        for (i = 5 - struct1.length; i > 0; i--) {
            struct1.push("")
            }
        }
    if (struct2.length < 5) {
        for (i = 5 - struct2.length; i > 0; i--) {
            struct2.push("")
            }
        }

    // 콜론 포함 항목으로부터 5칸씩 묶어 청크, 동일 청크 존재 검사
    let chunk1 = 0;
    let same1 = 0;
    for (i = 0; i < struct1.length - 4; i++) {
        let piv0 = struct1[i];
        let piv1 = struct1[i + 1];
        let piv2 = struct1[i + 2];
        let piv3 = struct1[i + 3];
        let piv4 = struct1[i + 4];

        if (piv0 != "") {
            chunk1 = chunk1 + 1;

            for (j = 0; j < struct2.length - 4; j++) {
                if ( ( piv0 == struct2[j] ) && ( piv1 == struct2[j + 1] ) && ( piv2 == struct2[j + 2] ) && ( piv3 == struct2[j + 3] ) && ( piv4 == struct2[j + 4] ) ) {
                    same1 = same1 + 1;
                    break;
                    }
                }
            }
        }
    let chunk2 = 0;
    let same2 = 0;
    for (i = 0; i < struct2.length - 4; i++) {
        let piv0 = struct2[i];
        let piv1 = struct2[i + 1];
        let piv2 = struct2[i + 2];
        let piv3 = struct2[i + 3];
        let piv4 = struct2[i + 4];

        if (piv0 != "") {
            chunk2 = chunk2 + 1;

            for (j = 0; j < struct1.length - 4; j++) {
                if ( ( piv0 == struct1[j] ) && ( piv1 == struct1[j + 1] ) && ( piv2 == struct1[j + 2] ) && ( piv3 == struct1[j + 3] ) && ( piv4 == struct1[j + 4] ) ) {
                    same2 = same2 + 1;
                    break;
                    }
                }
            }
        }

    let similarity = (same1 + same2) / (chunk1 + chunk2) * 100;
    return similarity;
}

function calc3(code1, code2) {
    // 문자열을 줄바꿈 문자('\n')를 기준으로 분할하여 배열로 반환
    let lines1 = code1.split('\n');
    let lines2 = code2.split('\n');

    // 공백 또는 탭만 존재하는 배열 삭제
    lines1 = lines1.map(item => item.replace(/[\s\t]/g, ''));
    lines2 = lines2.map(item => item.replace(/[\s\t]/g, ''));

    // 빈 문자열은 지우기
    for (i = 0; i < lines1.length; i++) {
        if (lines1[i] === "") {
            lines1.splice(i, 1);
        }
    }
    for (i = 0; i < lines2.length; i++) {
        if (lines2[i] === "") {
            lines2.splice(i, 1);
        }
    }

    // 전체 문자열 중 최대 공통 부분의 비율
    let same1 = 0;
    for (i = 0; i < lines1.length; i++){
        let temp = lines1[i];
        if (temp.length != 0) {
            let localmax = 0;
            for (j = 0; j < lines2.length; j++) {
                let simcalc = findmax( temp, lines2[j] ) / temp.length;
                if (simcalc > localmax) {
                    localmax = simcalc;
                    }
                }
            same1 = same1 + localmax
            }
        }
    let same2 = 0;
    for (i = 0; i < lines2.length; i++){
        let temp = lines2[i];
        if (temp.length != 0) {
            let localmax = 0;
            for (j = 0; j < lines1.length; j++) {
                let simcalc = findmax( temp, lines1[j] ) / temp.length;
                if (simcalc > localmax) {
                    localmax = simcalc;
                    }
                }
            same2 = same2 + localmax
            }
        }

    let similarity = (same1 + same2) / (lines1.length + lines2.length) * 100;
    return similarity;
}

function findmax(str1, str2) {
    let len1 = str1.length;
    let len2 = str2.length;

    // 두 문자열 중 하나의 길이가 0인 경우 공통 부분이 없으므로 0을 반환
    if (len1 === 0 || len2 === 0) {
        return 0;
    }

    // 두 문자열 간의 공통 부분을 계산하기 위한 테이블 초기화
    let dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    let maxLength = 0; // 가장 긴 공통 부분의 길이

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLength = Math.max(maxLength, dp[i][j]);
            } else {
                dp[i][j] = 0;
            }
        }
    }

    return maxLength;
}
