import React, { useState, useRef } from "react";
import { Modal, Row, Col, Typography, Input, Button } from "antd";

export default function CurrencyRateDialog({
  currency,
  price,
  showCurrency,
  inputHandler,
  setShowCurrencyModal,
}:any) {
  const inputRef = useRef();
  const [rate, setRate] = useState("");

  const submitHandler = () => {
    inputHandler(
      "exchange_rate",
      {
        rate: rate,
        currency: showCurrency.currency,
      },
      showCurrency?.rowId
    );
    // inputHandler(rowId, "foreginValue", price);
    setShowCurrencyModal(null);
  };
  return (
    <Modal
      title="Enter Currency Rate"
      open={showCurrency}
      width={300}
      onCancel={() => setShowCurrencyModal(false)}
      footer={[
        <Button key="back" onClick={() => setShowCurrencyModal(null)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={submitHandler}>
          Submit
        </Button>,
      ]}
    >
      {/* <Row>
        <Col span={24}>
          <Input
            ref={inputRef}
            value={rate}
            onKeyDown={(e) => e.key == "Enter" && submitHandler()}
            onChange={(e) => setRate(e.target.value)}
            type="number"
            placeholder="Enter Rate of exchange"
          />
        </Col>
      </Row>
      <Typography.Title
        level={5}
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        {showCurrency?.symbol} {rate * showCurrency?.price}
      </Typography.Title>
      <Typography.Title
        level={5}
        style={{ display: "flex", justifyContent: "center" }}
      >
        ₹ {showCurrency?.price}
      </Typography.Title> */}
    </Modal>
  );
};
