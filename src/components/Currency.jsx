export default function Currency({ money, setMoney }) {
   return (
        <div className="m-3 px-4 pt-3 pb-2 rounded bg-light text-start">
            <h5>Money</h5>
            <h3 className="fw-bold">${money}</h3>
        </div>
    );
}