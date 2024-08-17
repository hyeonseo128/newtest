const questions = [
    "1. 나는 새로운 사람들과 쉽게 친해진다.",
    "2. 나는 혼자 있는 시간을 즐긴다.",
    "3. 나는 계획을 세우고 그에 따라 행동하는 것을 선호한다.",
    "4. 나는 감정적으로 반응하는 편이다.",
    "5. 나는 즉흥적인 결정을 내리는 것을 좋아한다.",
    "6. 나는 데이터를 기반으로 결정을 내리는 편이다.",
    "7. 나는 남과의 대화에서 에너지를 얻는 편이다.",
    "8. 나는 깊은 생각에 빠져 있는 시간을 좋아한다.",
    "9. 나는 사람들의 감정을 잘 이해하는 편이다.",
    "10. 나는 문제를 해결할 때 직관보다는 사실을 중시한다.",
    "11. 나는 다양한 의견을 듣고 싶어 한다.",
    "12. 나는 정해진 규칙을 따르는 것을 선호한다.",
    "13. 나는 사람들과의 만남이 피곤하게 느껴질 때가 있다.",
    "14. 나는 새로운 아이디어를 시도하는 것을 두려워하지 않는다.",
    "15. 나는 세부 사항에 신경 쓰는 편이다.",
    "16. 나는 대화 중에 다른 사람의 의견을 중시한다."
];

function loadQuestions() {
    const questionsDiv = document.getElementById('questions');
    questions.forEach((question, index) => {
        const questionHtml = `
            <p>${question}</p>
            <label><input type="radio" name="answer${index}" value="1" required> 예</label>
            <label><input type="radio" name="answer${index}" value="2"> 아니오</label>
        `;
        questionsDiv.innerHTML += questionHtml;
    });
}

function calculateResult(event) {
    event.preventDefault();
    let extroversion = 0;
    let judging = 0;
    let feeling = 0;
    let sensing = 0;

    for (let i = 0; i < questions.length; i++) {
        const answer = document.querySelector(`input[name="answer${i}"]:checked`);
        if (answer) {
            if (i in [0, 1, 6, 7, 13]) {
                if (answer.value === '1') {
                    extroversion += 1;
                } else {
                    sensing += 1;
                }
            } else if (i in [2, 3, 4, 10, 11]) {
                if (answer.value === '1') {
                    judging += 1;
                } else {
                    feeling += 1;
                }
            } else if (i in [5, 8, 9, 14, 15]) {
                if (answer.value === '1') {
                    feeling += 1;
                } else {
                    judging += 1;
                }
            }
        }
    }

    let personalityType = "";
    personalityType += extroversion > sensing ? "E" : "I";
    personalityType += sensing > judging ? "S" : "N";
    personalityType += feeling > judging ? "F" : "T";
    personalityType += judging > feeling ? "J" : "P";

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `당신의 MBTI 성격유형은: ${personalityType}입니다.`;
    resultDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', loadQuestions);
document.getElementById('mbtiForm').addEventListener('submit', calculateResult);
