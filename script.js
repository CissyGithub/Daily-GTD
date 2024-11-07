// 替换成你的 API 密钥
const apiKey = "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"; // 在这里替换成你的实际 API 密钥

// 生成 todo list 的函数
document.getElementById("generateTodo").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) {
        alert("请输入今天要做的事情");
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "user", content: `请帮我生成一个GTD任务列表，包括以下任务的详细时间安排：${userInput}` }
                ],
                max_tokens: 100,
            })
        });

        const data = await response.json();
        const generatedTodo = data.choices[0].message.content;

        // 显示生成的 todo list
        const todoListContainer = document.getElementById("todoListContainer");
        const todoList = document.getElementById("todoList");
        todoList.innerText = generatedTodo;
        todoListContainer.style.display = "block";
    } catch (error) {
        console.error("Error calling GPT-4 API:", error);
        alert("生成任务列表时出错，请稍后再试。");
    }
});
