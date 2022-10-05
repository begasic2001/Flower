import Joi from "joi";

const userValidate = (data) => {
	const userSchema = Joi.object({
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			})
			.lowercase()
			.required(),
		password: Joi.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.required(),
		
	});

	return userSchema.validate(data);
};

module.exports = {
	userValidate,
};
