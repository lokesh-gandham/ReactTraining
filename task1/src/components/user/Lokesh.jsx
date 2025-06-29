import React, { useEffect, useRef } from "react";

function Lokesh() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="Type here..." />;
}
export default Lokesh;