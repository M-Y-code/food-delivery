import { CardElement } from "@stripe/react-stripe-js";

const CardSection = () => {
  return (
    <div>
      <div>
        <label htmlFor="card-element">クレジット/デビットカード</label>
        <div>
          <fieldset>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
