export const AddressForm = ({
    disabled = false,
    required = true,
    formData,
    onChange,
    errors,
}) => {
    return (
        <>
            <input
                disabled={disabled}
                onChange={onChange}
                value={formData.country}
                required={required}
                type="text"
                className={`input ${
                    errors.includes("country") ? "invalid" : ""
                }`}
                id="country"
                name="country"
                placeholder="Country"
            />
            <input
                disabled={disabled}
                onChange={onChange}
                value={formData.address_line_1}
                required={required}
                type="text"
                className={`input ${
                    errors.includes("address_line_1") ? "invalid" : ""
                }`}
                name="address_line_1"
                placeholder="Address line 1"
            />
            <input
                disabled={disabled}
                onChange={onChange}
                value={formData.address_line_2}
                required={required}
                type="text"
                className={`input ${
                    errors.includes("address_line_2") ? "invalid" : ""
                }`}
                name="address_line_2"
                placeholder="Address line 2"
            />
            <div className="payment-method-form__even-cols">
                <input
                    disabled={disabled}
                    onChange={onChange}
                    value={formData.city}
                    required={required}
                    type="text"
                    className={`input ${
                        errors.includes("city") ? "invalid" : ""
                    }`}
                    name="city"
                    placeholder="City"
                />
                <input
                    disabled={disabled}
                    onChange={onChange}
                    value={formData.postal_code}
                    required={required}
                    type="text"
                    className={`input ${
                        errors.includes("postal_code") ? "invalid" : ""
                    }`}
                    name="postal_code"
                    placeholder="Postal code"
                />
            </div>
            <input
                disabled={disabled}
                onChange={onChange}
                value={formData.state}
                required={required}
                type="text"
                className={`input ${
                    errors.includes("state") ? "invalid" : ""
                } `}
                name="state"
                placeholder="State, country, province, or region"
            />
        </>
    )
}
