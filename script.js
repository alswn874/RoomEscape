const quizData = [
    { image: "imgs/t1.jpg", answer: "null"},
    { image: "imgs/q1.jpg", answer: "q1"}
  ];

const codeData = ["1111"];

  let currentQuestion = 0;
  let currentcode = 0;
  let history = null;
  let startTime = null;
  let timerInterval = null;
  

  const questionImage = document.getElementById("question-image");
//   const answerInput = document.getElementById("answer-input");
//   const submitBtn = document.getElementById("submit-btn");
  const feedback = document.getElementById("feedback");
  const timerEl = document.getElementById("code-timer");
  const timerE2 = document.getElementById("image-timer");
  const startBtn = document.getElementById("start-btn");
  const codeSection = document.getElementById("code-section");
  const quizSection = document.getElementById("image-section");
  const codeForm = document.getElementById('codeForm');
  const codeInput = document.getElementById('codeInput');
  const left = document.getElementById('undo');
  const right = document.getElementById('redo');
  localStorage.removeItem('startTime');

  //타이머 관련


  function startTimer() {
    let storedStart = localStorage.getItem("startTime");
    startTime = storedStart ? parseInt(storedStart, 10) : Date.now();
    //   let storedStart = localStorage.getItem(startTimeKey);
  //   let startTime = storedStart ? parseInt(storedStart, 10) : Date.now();

    if (!storedStart) {
      localStorage.setItem("startTime", startTime);
    }

    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const totalSeconds = Math.floor(elapsed / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      const format = (num) => String(num).padStart(2, '0');
      timerEl.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
      timerE2.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    }, 1000);
  }


  
  function stopTimer() {
    clearInterval(timerInterval);
  }

  //퀴즈 결과
  // function showResult() {
  //   stopTimer();
  
  //   // 마지막 시간 계산 (필요하면 여기서 쓸 수 있음)
  //   const elapsed = Date.now() - startTime;
  //   const totalSeconds = Math.floor(elapsed / 1000);
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  
  //   // 결과 화면 표시 부분 제거 (안 보이게 처리)
  //   // quizContainer.classList.add("hidden");
  //   // resultContainer.classList.remove("hidden");
  //   // scoreEl.textContent = `총 ${quizData.length}문제 중 ${score}문제를 맞췄습니다.\n소요 시간: ${minutes}분 ${seconds}초`;
  //   timerEl.textContent = "";
  
  //   // 1초 뒤 play.html로 이동
  //   setTimeout(() => {
  //     window.location.href = "play.html";
  //   }, 1000);
  // }

  // 코드 입력 시작
  function showQuestion() {
    if (startTime === null) {
      startTimer();
    }
  
    feedback.textContent = "";
    // questionImage.src = quizData[currentQuestion].image;
    // answerInput.value = "";
    // answerInput.focus();
  }

  function ShowSection(section) {
    const currentActive = document.querySelector(".section.active");
    if (currentActive) {
      currentActive.classList.remove("active");
    }
    section.classList.add("active");
    // document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    // section.classList.add("active");
  }

  //퀴즈 보여주기
  function updateImage() {
    if (currentQuestion >= quizData.length) {
      // stopTimer();
      showResult();
      return;
    }
  
    feedback.textContent = "";
    questionImage.src = quizData[currentQuestion].image;
    if (currentQuestion < 1){
      history = 0;
    } else{
      if (quizData[currentQuestion-1].answer == "null")
        history = 1;
      else history = 0;
    }
    //초기 화살표 표기
    if(quizData[currentQuestion].answer == "null"){
      if(history == 0){
        left.classList.add('hidden');
        right.classList.remove('hidden');
      } else{
        left.classList.remove('hidden');
        right.classList.remove('hidden');
      }
      
    } else{
      if(history == 1){
        left.classList.remove('hidden');
        right.classList.add('hidden');
      } else{
        left.classList.add('hidden');
        right.classList.add('hidden');
      }

      // currentQuestion ++;
    }
  }

  left.addEventListener('click', () => {
    currentQuestion --;
    updateImage();
  });

  right.addEventListener('click', () => {
    currentQuestion ++;
    updateImage();
  });

  // 초기 이미지 설정
  updateImage();

  
  codeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 기본 제출 방지
    const enteredCode = codeInput.value.trim();

    if (enteredCode === codeData[currentcode]) {
      feedback.textContent = "";
      ShowSection(quizSection);
      // startTimer();
      updateImage()
    } else {
      feedback.textContent = "잘못된 문제 코드입니다. 다시 입력하세요.";
    }
  });


  //quiz 시작


  startBtn.addEventListener("click", () => {
    stopTimer();
    localStorage.removeItem('startTime');
    startTime = null;
    feedback.textContent = "";
    ShowSection(codeSection);
    showQuestion();
  });

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
  