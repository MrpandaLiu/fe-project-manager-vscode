import React, { useState } from 'react';
import { render } from "react-dom";

// eslint-disable-next-line @typescript-eslint/naming-convention
function DashBoard() {
  const [num, setNum] = useState(0);

  return (
    <div>
      this is Dashboard
      <div>
          number is {num} now
      </div>
      <button onClick={() => { setNum(num + 1); }}>plus</button>
    </div>
  );
}

render(<DashBoard />, document.getElementById("root"));
