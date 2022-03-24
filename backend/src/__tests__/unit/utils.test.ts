import {
    isAmountValid,
    isMeterNumberValid,
    responseMessage,
} from "../../utils/app-utils";

describe("IsAmountValid method", () => {
    it("should return false for invalid amount", () => {
        expect(isAmountValid(89)).toBe(false);
    });

    it("should return true for valid amount", () => {
        expect(isAmountValid(8900)).toBe(true);
    });

});

describe("isMeterNumberValid method", () => {
    it("return false for invalid meter number", () => {
        expect(isMeterNumberValid("29")).toBe(false);
    });

    it("return true for valid meter number", () => {
        expect(isMeterNumberValid("893243")).toBe(true);
    });
});

describe("responseMessage method", () => {
    it("should return the expected response for ony string", () => {
        expect(responseMessage("89")).toEqual({
            message: "89",
            body: null,
        });
    });
});
