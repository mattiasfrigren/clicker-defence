import {useState,useRef,useEffect, useContext} from 'react'
import {AuthContext} from '../context/authenticatContext';

function UseDragging(X,Y) {
    const [isDragging, setIsDragging] = useState(false);
    const [pos, setPos] = useState({ x: X, y: Y });
    const [refreshPos, setRefreshPos] = useState(false);
    const authContext = useContext(AuthContext);
    const ref = useRef(null);
  

    function refresh(){
      setPos({x:X, y:Y});
      
      setRefreshPos(false);
    }

    function onMouseMove(e) {
      if (!isDragging) return;
      setPos({
        x: e.x - ref.current.offsetWidth / 2,
        y: e.y - ref.current.offsetHeight / 2,
      });
      e.stopPropagation();
      e.preventDefault();
    }
  
    function onMouseUp(e) {
      setIsDragging(false);
      e.stopPropagation();
      e.preventDefault();
    }
  
    function onMouseDown(e) {
      if (e.button !== 0) return;
      setIsDragging(true);
  
      setPos({
        x: e.x - ref.current.offsetWidth / 2,
        y: e.y - ref.current.offsetHeight / 2,
      });
  
      e.stopPropagation();
      e.preventDefault();
    }
    
   useEffect(() => {
  
      
      ref.current.addEventListener("mousedown", onMouseDown);
 
    }, [ref.current]);
  
   
    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);
      } else {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
      return () => {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      };
    }, [isDragging]);
  
    useEffect(()=>{
      if(refreshPos){
        refresh();
      }
    },[refreshPos]);

    return [ref, pos.x, pos.y, isDragging, setRefreshPos];
  }

  export default UseDragging;