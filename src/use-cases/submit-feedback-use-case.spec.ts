import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
	it("should be able to submit a feedback", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "Exemple comment",
				screenshot: "data:image/png;base64ae454324sd3ad4ad",
			})
		).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it("should not be able to submit feedback without a type", async () => {
		await expect(
			submitFeedback.execute({
				type: "",
				comment: "Exemple comment",
				screenshot: "data:image/png;base64ae454324sd3ad4ad",
			})
		).rejects.toThrow();
	});

	it("should not be able to submit feedback without a comment", async () => {
		await expect(
			submitFeedback.execute({
				type: "Any bug",
				comment: "",
				screenshot: "data:image/png;base64ae454324sd3ad4ad",
			})
		).rejects.toThrow();
	});

	it("should not be able to submit feedback wit an invalid screenshot type", async () => {
		await expect(
			submitFeedback.execute({
				type: "Any bug",
				comment: "Any comment",
				screenshot: "test.jpg",
			})
		).rejects.toThrow();
	});
});
