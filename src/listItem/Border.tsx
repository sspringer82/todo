export const TitleBorderTop = () => {
  return (
    <div style={{ display: 'flex', position: 'relative', top: 0 }}>
      <div style={{ height: 5, width: 5, backgroundColor: 'blue' }}></div>
      <div style={{ width: 100, height: 1, backgroundColor: 'blue' }}></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 7,
          width: 15,
          backgroundColor: 'blue',
          transform: 'skew(70deg)',
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
    </div>
  );
};

export const TitleBorderBottom = () => {
  return (
    <div style={{ display: 'flex', position: 'relative', bottom: 0 }}>
      <div style={{ height: 5, width: 5, backgroundColor: 'blue' }}></div>
      <div
        style={{
          width: 110,
          height: 1,
          backgroundColor: 'blue',
          marginTop: 4,
        }}
      ></div>
      <div
        style={{
          marginTop: 4,
          marginLeft: 7,
          marginRight: 7,
          height: 7,
          width: 15,
          backgroundColor: 'blue',
          transform: 'skew(70deg)',
        }}
      ></div>
      <div
        style={{
          width: 90,
          height: 1,
          backgroundColor: 'blue',
          marginTop: 10,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
    </div>
  );
};

export const ButtonContainerTop = () => {
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
    </div>
  );
};

export const ButtonContainerBottom = () => {
  return (
    <div style={{ display: 'flex', position: 'relative', bottom: 0 }}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: 'blue',
          marginTop: 10,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'blue',
          marginTop: 6,
        }}
      ></div>
    </div>
  );
};

export const ButtonContainer: React.FC = (props) => {
  return (
    <div style={{ position: 'relative', marginLeft: 5 }}>
      <ButtonContainerTop />
      <div style={{ position: 'relative' }}>
        &nbsp;
        <div
          style={{
            position: 'absolute',
            top: 1,
            left: 12,
          }}
        >
          {props.children}
        </div>
      </div>
      <ButtonContainerBottom />
    </div>
  );
};

const ActionsContainerm = () => {};
