# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`




# Hướng dẫn thuật toán genetic algorithm (là đang nói về sự tiến hóa - evolution)

## Công thức 4 bước cho sự tiến hóa thành công
1. Base of Natural Selection (Cơ sở chọn lọc tự nhiên)
2. Spread on some Passing of genes (Lây lan trên một số gen di Truyền)
3. Mutated Babies (trẻ sơ sinh đột biến)
4. Heat for 10000 generations (10000 thế hệ)


- Mỗi player (Dot) có 1 brain
- brain chứa các bước đi (hướng đi) trong khoảng 1000 bước, lúc đầu là random thôi, sau đó là đc lưu lại best player ở vị trí đầu danh sách, những vị trí khác được random theo tổng fitness để làm thế hệ tiếp theo (hàm selectParent)

### 1. fitness là gì? Tại sao nó có công thức đó ?
`this.fitness = 1.0/16.0 + 10000.0/(this.brain.step * this.brain.step);` và `this.fitness = 1.0/(distanceToGoal * distanceToGoal);`
- Là số điểm thích nghi của player
- Là 1 chia cho khoảng cách tới đích nhân khoảng cách tới đích
- Nếu tới đích rồi thì bằng 1 chia cho 16 công 10000 (gấp 10 lần hướng đi) chia cho số bước nhân với số bước
- Nếu tổng fitness của 1 số player đầu cao hơn random (ko quá tổng fitness) thì được chọn làm parent, nếu ko thì parent là player khởi đầu. Suy ra trừ best player vị trí 0 là đc chọn còn lại là tùy theo random của select parent

### 2.hàm dist tính gần đích là như thế nào?
- Tính khoảng cách giữa 2 điểm

### 3. fitness function la gi? 
- Hàm thích nghi được định nghĩa đơn giản là một hàm lấy giải pháp ứng cử viên cho vấn đề làm đầu vào & tạo ra đầu ra mức độ "phù hợp" hoặc "tốt" đối với vấn đề

### 4. Fitness của player liên quan đến calculateFitnessSum và selectParent

### 5. Best player đc vẽ màu xanh to hơn

### 6. Suy ra best player được lưu lại ở vị trí 0, và được dùng để tính toán số bước đi ngắn nhất, sau khi đã đi đến đích thì những lần sau nó vẫn cứ đi đường đó. Nó sẽ ko thay đổi best player nữa vì số fitness của nó lúc này là lớn nhất ?

### 7. Tài sao phải tính tổng fitness? Khi all dead thì tính fitness cho các player. Khi chọn lọc tự nhiên lần tiếp theo thì dựa theo tổng fitness. Sau khi chọn lọc xong thì đột biến (mutate - đột biến) brain cho nó bằng cách random một số hướng đi mới (mutate-đột biến brain). Tính tổng chỉ mang tính random thôi?