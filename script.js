

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
  const restartBtn = document.getElementById("restart-btn");
  const timerEl = document.getElementById("timer");
  
  const scoreTextEl = document.getElementById("score");     // 결과 페이지 텍스트
  const scoreTitleEl = document.getElementById("scoreEl");  // h1 문제 번호
  
  function updateScoreTitle() {
    scoreTitleEl.textContent = `문제 번호: ${currentQuestion + 1}`;
  }
  

  // function startTimer() {
  //   startTime = Date.now();
  //   timerInterval = setInterval(() => {
  //     const elapsed = Date.now() - startTime;
  //     const totalSeconds = Math.floor(elapsed / 1000);
  //     const minutes = Math.floor(totalSeconds / 60);
  //     const seconds = totalSeconds % 60;
  //     timerEl.textContent = `시간: ${minutes}분 ${seconds}초`;
  //   }, 1000);
  // }
  
  function startTimer() {
    const storedStart = localStorage.getItem("startTime");
    startTime = storedStart ? parseInt(storedStart, 10) : Date.now();
  
    // startTime이 없었다면 지금 저장
    if (!storedStart) {
      localStorage.setItem("startTime", startTime);
    }
  
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
      updateScoreTitle();
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

  function showResult() {
    stopTimer();
  
    // 마지막 시간 계산 (필요하면 여기서 쓸 수 있음)
    const elapsed = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    // 결과 화면 표시 부분 제거 (안 보이게 처리)
    // quizContainer.classList.add("hidden");
    // resultContainer.classList.remove("hidden");
    // scoreEl.textContent = `총 ${quizData.length}문제 중 ${score}문제를 맞췄습니다.\n소요 시간: ${minutes}분 ${seconds}초`;
    timerEl.textContent = "";
  
    // 1초 뒤 play.html로 이동
    setTimeout(() => {
      window.location.href = "play.html";
    }, 1000);
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
  