<script lang="ts">
	import HelperText from "$lib/components/common/HelperText.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import FieldGroup from "$lib/components/ui/field/field-group.svelte";
	import Field from "$lib/components/ui/field/field.svelte";
	import { Input } from "$lib/components/ui/input/index.js";
	import Label from "$lib/components/ui/label/label.svelte";
	import { formBaseSchema, formSchema } from "$lib/form-configs/form-schema";

    let formData = $state({
		Username: '',
		Email: '',
		Age:"",
		Password: '',
		PasswordConfirm: '',
		Phone : '',
		AcceptTerms : false
	});

    let errors: Record<string, string> = $state({});
    let touched: Record<string, boolean> = $state({});
    type FieldKeys = keyof typeof formData

    function validateField(field: FieldKeys) {
		const partial = formBaseSchema.pick({ [field]: true } as object);
		const result = partial.safeParse({ [field]: formData[field] });

		if (!result.success) {
			errors[field] = result.error.issues[0].message;
		} else {
			delete errors[field];
		}
	}

    function validatePasswordConfirm() {
		const result = formSchema.safeParse(formData);

		const issue = result.success
			? null
			: result.error.issues.find((i) => i.path[0] === 'PasswordConfirm');

		if (issue) {
			errors.PasswordConfirm = issue.message;
		} else {
			delete errors.PasswordConfirm;
		}
	}

	function onBlur(field: FieldKeys) {
		touched[field] = true;
		validateField(field);
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		// mark everything touched
		Object.keys(formData).forEach((key) => (touched[key] = true));

		const result = formSchema.safeParse(formData);

		if (!result.success) {
			errors = Object.fromEntries(
				result.error.issues.map((issue) => [issue.path[0] as string, issue.message])
			);
			return;
		}

		// Submit formData to some API
	}


</script>

 <div class="w-full min-h-screen py-10 flex justify-center items-center">
    <div class="w-full max-w-md">
     <form onsubmit={onSubmit}>
      	<FieldGroup>
		<div class="flex flex-col items-center gap-1 text-center">
			<h1 class="text-2xl font-bold">Client side validation</h1>
			<p class="text-sm text-balance text-muted-foreground">
				Sample inputs to demo client-side validation using zod
			</p>
		</div>
		
		<Field>
			<Label for="Username">Username</Label>
			<Input
				id="Username"
				type="text"
				class={`${errors?.['Username'] ? 'border-destructive' : ''}`}
				bind:value={formData.Username}
				onblur={() => onBlur('Username')}
				oninput={() => touched.Username && validateField('Username')}
				placeholder="John Doe"
			/>
			<HelperText variant="error" message={errors?.['Username'] || ''} show={!!errors?.['Username']}
			></HelperText>
		</Field>
		
		<Field>
			<Label for="Email">Email</Label>
			<Input
				id="Email"
				type="email"
				bind:value={formData.Email}
				class={`${errors?.['Email'] ? 'border-destructive' : ''}`}
				placeholder="m@example.com"
				onblur={onBlur.bind(null, 'Email')}
				oninput={() => touched.Email && validateField('Email')}
			/>
			<HelperText variant="error" message={errors?.['Email'] || ''} show={!!errors?.['Email']}
			></HelperText>
		</Field>
		
		<Field>
			<Label for="Phone">Phone</Label>
			<Input
				id="Phone"
				bind:value={formData.Phone}
				class={`${errors?.['Phone'] ? 'border-destructive' : ''}`}
				placeholder="0781235648"
				onblur={onBlur.bind(null, 'Phone')}
				oninput={() => touched.Phone && validateField('Phone')}
			/>
			<HelperText variant="error" message={errors?.['Phone'] || ''} show={!!errors?.['Phone']}
			></HelperText>
		</Field>
		
		<Field>
			<Label for="Age">Age</Label>
			<Input
				id="Age"
				bind:value={formData.Age}
				class={`${errors?.['Age'] ? 'border-destructive' : ''}`}
				placeholder="23"
				onblur={onBlur.bind(null, 'Age')}
				oninput={() => touched.Age && validateField('Age')}
			/>
			<HelperText variant="error" message={errors?.['Age'] || ''} show={!!errors?.['Age']}
			></HelperText>
		</Field>
		
		<Field>
			<Label for="Password">Password</Label>
			<Input
				id="Password"
				bind:value={formData.Password}
				onblur={onBlur.bind(null, 'Password')}
				oninput={() => touched.Password && validateField('Password')}
				class={`${errors?.['Password'] ? 'border-destructive' : ''}`}
				type="password"
			/>
			<HelperText
				variant={errors?.['Password'] ? 'error' : 'info'}
				message={"Choose a strong password (8+ characters with 1 uppercase, 1 number, and 1 special character)."}
			></HelperText>
		</Field>
		
		<Field>
			<Label for="passwordConfirm">Confirm Password</Label>
			<Input
				id="passwordConfirm"
				class={`${errors?.['PasswordConfirm'] ? 'border-destructive' : ''}`}
				bind:value={formData.PasswordConfirm}
				onblur={validatePasswordConfirm}
				oninput={() => touched.PasswordConfirm && validateField('PasswordConfirm')}
				type="password"
			/>
			<HelperText
				variant="error"
				message={errors?.['PasswordConfirm'] || ''}
				show={!!errors?.['PasswordConfirm']}
			></HelperText>
		</Field>

		<Field >
			<div class="flex items-start gap-3">
				<Checkbox id="AcceptTerms" checked={formData.AcceptTerms} />
 				<Label for="AcceptTerms">Accept terms and conditions</Label>
 			</div>
				<HelperText
					variant={'error'}
					 message={errors?.['AcceptTerms'] || ''} 
					 show={!!errors?.['AcceptTerms']}
				></HelperText>
		</Field>

		<Field>
			<Button type="submit">
				Submit
			</Button>
		</Field>
	</FieldGroup>
     </form>
    </div>
 </div>