class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

export default async function sketch(p5, context) {
	
	let canvas, points;
	let initialPointCount;
	let doneSetup = false;
	async function addNewPoint(){
		if(!doneSetup){
			return;
		}
		try {
			const point_1 = points[Math.floor(Math.random() * initialPointCount)]
			const point_2 = points[Math.floor(Math.random() * points.length)]
			const [new_x, new_y] = await context.awaitPythonFunctionResult("add_new_point",[point_1, point_2]);
			points.push(new Point(new_x, new_y))
		} catch{};
		setTimeout(addNewPoint, 1);
	}

	async function userSetup(){
		try {
			const newPoints = await context.awaitPythonFunctionResult("create_initial_points");
			newPoints.forEach((point) => {
				points.push(new Point(point[0], point[1]))
			});
			initialPointCount = newPoints.length;
			doneSetup = true;
			setTimeout(addNewPoint, 0);
		}
		catch{
			userSetup()
		};
	}

	p5.setup = () => {
		canvas = p5.createCanvas(400, 300);
		points = [];
		initialPointCount = 0;
		setTimeout(userSetup, 0);
		userSetup();
	};

	p5.draw = () => {
		p5.background(0,0,0);
		if (!doneSetup){
			return;
		}
		p5.scale(p5.width / 2, -p5.height);
		p5.translate(0.99, -0.99);
		p5.stroke("white")
		p5.strokeWeight(0.01);
		points.forEach((point)=>{
			p5.point(point.x, point.y);
		})
	};
	const reset = () =>{
		doneSetup = false;
		context.resetFunctionCallQueue();
		p5.setup()
	}
	context.addPythonApiFunction(reset)


}
