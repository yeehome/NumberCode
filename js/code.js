/**
 * 生成支持加、减、乘、除的验证码
 * @returns {Object} { formula: 算式字符串, result: 正确结果 }
 */
function generateMathCaptcha() {
  // 定义支持的运算类型（显示用符号）和对应的计算函数
  const operations = [
    { symbol: '+', calculate: (a, b) => a + b }, // 加法
    { symbol: '-', calculate: (a, b) => a - b }, // 减法
    { symbol: '×', calculate: (a, b) => a * b }, // 乘法（显示用×，计算用*）
    { symbol: '÷', calculate: (a, b) => a / b }  // 除法（显示用÷，计算用/）
  ];

  // 随机选择一种运算
  const { symbol, calculate } = operations[Math.floor(Math.random() * operations.length)];

  let num1, num2, result;

  // 根据运算类型生成符合规则的数字
  switch (symbol) {
    case '+':
      // 加法：num1 (1-20)，num2 (1-20)，和不超过 40
      num1 = Math.floor(Math.random() * 20) + 1; // 1-20
      num2 = Math.floor(Math.random() * (40 - num1)) + 1; // 确保和 <=40
      result = calculate(num1, num2);
      break;

    case '-':
      // 减法：num1 (5-30)，num2 (1到num1-1)，确保结果非负
      num1 = Math.floor(Math.random() * 26) + 5; // 5-30
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1到num1-1
      result = calculate(num1, num2);
      break;

    case '×':
      // 乘法：num1 (1-10)，num2 (1-10)，积不超过 100
      num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      result = calculate(num1, num2);
      break;

    case '÷':
      // 除法：除数 num2 (1-10)，被除数 num1 = num2 × 倍数 (2-10)，确保整除
      num2 = Math.floor(Math.random() * 10) + 1; // 除数 1-10
      const multiple = Math.floor(Math.random() * 9) + 2; // 倍数 2-10（避免商为1，太简单）
      num1 = num2 * multiple; // 被除数 = 除数 × 倍数（确保整除）
      result = calculate(num1, num2); // 结果为倍数（整数）
      break;
  }

  // 构建算式字符串（如 "5 + 3 = ?"）
  const formula = `${num1} ${symbol} ${num2} = ?`;

  return { formula, result: Math.floor(result) }; // 确保结果为整数（除法已保证整除）
}

// 示例：生成验证码并验证用户输入
function verifyCaptcha(userInput) {
  const { formula, result } = generateMathCaptcha();
  console.log("验证码算式：", formula); // 前端显示算式
  return Number(userInput) === result; // 验证用户输入是否等于结果
}

// 测试：生成10个验证码示例
for (let i = 0; i < 10; i++) {
  const captcha = generateMathCaptcha();
  console.log(`算式：${captcha.formula}，正确结果：${captcha.result}`);
}
