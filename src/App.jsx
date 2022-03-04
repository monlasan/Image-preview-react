import './app.css';
import { useRef, useState, useEffect } from 'react ';

function App() {
  const FileInputReference = useRef();
  const [image, setimage] = useState();
  const [preview, setpreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setpreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setpreview(null);
    }
  }, [image]);
  return (
    <div className='App'>
      <form>
        {preview ? (
          <>
            <img
              src={preview}
              onClick={() => {
                setimage(null);
              }}
            />
            <p>Click to pick a different image</p>
          </>
        ) : (
          <button
            className='button'
            onClick={(event) => {
              event.preventDefault();
              FileInputReference.current.click();
            }}
          >
            Get image!
          </button>
        )}
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            const image = e.target.files[0];
            if (image) {
              setimage(image);
            }
          }}
          style={{ display: 'none' }}
          ref={FileInputReference}
        />
      </form>
    </div>
  );
}

export default App;
