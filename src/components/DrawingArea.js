import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Line} from 'react-konva';


const DrawingArea = ({onClearLines, clearLines}) => {

    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    useEffect(()=> {
        //loadImage()
    }, [clearLines])

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, {points: [pos.x, pos.y]}]);
    }

    const handleMouseMove = (e) => {
        // no drawing = skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        // To draw line
        let lastLine = lines[lines.length -1];

        if(lastLine) {
            // add point
            lastLine.points = lastLine.points.concat([point.x, point.y]);

            // replace last
            lines.splice(lines.length -1, 1, lastLine);
            setLines(lines.concat());
        }
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    }

    console.log(lines)


    return (
        <div className="drawing-area">
            <Stage
                width={640}
                height={416}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                className="canvas-stage"
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line 
                        key={i}
                        points={line.points}
                        stroke="red"
                        strokeWidth={3}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                        />
                    ))}
                </Layer>

            </Stage>
            
        </div>
    )
}

export default DrawingArea
