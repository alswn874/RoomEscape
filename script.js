const quizData = [
    { image: "images/q1.png", answer: "html" },
    { image: "images/q2.png", answer: "css" },
    { image: "images/q3.png", answer: "javascript" }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let startTime = null;
  let timerInterval = null;
  
  const questionImage = document.getElementById("question-image");
  const answerInput = document.getElementById("answer-input");
  const submitBtn = document.getElementById("submit-btn");
  const feedback = document.getElementById("feedback");
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const timerEl = document.getElementById("timer");
  
  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const totalSeconds = Math.floor(elapsed / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerEl.textContent = `시간: ${minutes}분 ${seconds}초`;
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  function showQuestion() {
    if (currentQuestion >= quizData.length) {
      stopTimer();
      showResult();
      return;
    }
  
    if (startTime === null) {
      startTimer();
    }
  
    feedback.textContent = "";
    questionImage.src = quizData[currentQuestion].image;
    answerInput.value = "";
    answerInput.focus();
  }
  
  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizData[currentQuestion].answer.toLowerCase();
  
    if (userAnswer === "") {
      feedback.textContent = "답변을 입력해주세요.";
      return;
    }
  
    if (userAnswer === correctAnswer) {
      score++;
      currentQuestion++;
      showQuestion();
    } else {
      feedback.textContent = "틀렸습니다. 다시 시도하세요.";
      answerInput.focus();
    }
  }
  
  function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  
    // 마지막 시간 표시 업데이트
    const elapsed = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    scoreEl.textContent = `총 ${quizData.length}문제 중 ${score}문제를 맞췄습니다.\n소요 시간: ${minutes}분 ${seconds}초`;
    timerEl.textContent = "";  // 퀴즈 종료 후 타이머 숨김
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    startTime = null;
    feedback.textContent = "";
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
  }
  
  submitBtn.addEventListener("click", checkAnswer);
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
  restartBtn.addEventListener("click", restartQuiz);
  
  showQuestion();
  