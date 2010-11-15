<h2>Create an account</h2>

<form class="CreateAccount" method="post" action="./createaccount.php">
	<fieldset>
		<div>
			<label for="name">Display name</label>
			<input type="text" id="name" name="name" value="" />
		</div>
		<div>
			<label for="password">Password (minimum 12 chars, must contain lower case, capital and number</label>
			<input type="password" id="password1" name="password1" value="" />
		</div>
		<div>
			<label for="password2">Password confirmation</label>
			<input type="password" id="password2" name="password2" value="" />
		</div>
		<div>
			<label for="email">Email</label>
			<input type="text" id="email" name="email" value="" />
		</div>
		<div>
			<label for="first_name">First name</label>
			<input type="text" id="first_name" name="first_name" value="" />
		</div>
		<div>
			<label for="last_name">Last name</label>
			<input type="text" id="last_name" name="last_name" value="" />
		</div>
	</fieldset>
	<div>
		<input type="submit" name="createAccount" value="Create Account" />
	</div>
</form>