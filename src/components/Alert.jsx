function Alert({ message,col}) {
  return (
    <div className={`font-bold text-2xl ${col} alert flex justify-between`}>
      {message}
    </div>
  );
}

export default (Alert);
