import { Button } from "./Button";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
}
interface SubscribeFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
export const SubscribeForm = () => {
  const subscribeUser = async (
    e: React.SyntheticEvent<SubscribeFormElement>
  ) => {
    e.preventDefault();

    const email = e.currentTarget.elements.email;
    const name = e.currentTarget.elements.name;

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: email.value,
        name: name.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (res.status === 201) {
      console.log("success");
    } else {
      console.log("error");
    }
  };
  return (
    <form
      onSubmit={subscribeUser}
      className="grid gap-3 grid-flow-row md:grid-flow-col md:w-fit"
    >
      <label
        className="inline-grid text-sm text-gray-600 leading-[2]"
        htmlFor="FNAME"
      >
        First Name
        <input
          className="bg-blue-50/60 px-2 border-b-2 p-1 border-gray-400 text-gray-900 text-xl rounded-none min-w-[240px] leading-10 focus:outline-none focus:border-blueAccent"
          id="FNAME"
          type="text"
          name="name"
          required
        />
      </label>

      <label
        className="inline-grid text-sm text-gray-600 leading-[2]"
        htmlFor="EMAIL"
      >
        Email
        <input
          className="bg-blue-50/60 px-2 border-b-2 p-1 border-gray-400 text-gray-900 text-xl rounded-none min-w-[240px] leading-10 focus:outline-none focus:border-blueAccent"
          id="EMAIL"
          type="email"
          name="email"
          required
        />
      </label>
      <Button
        variant="secondary"
        type="submit"
        className="md:leading-[0.95rem] mt-4 md:mt-0"
      >
        Subscribe
      </Button>
    </form>
  );
};
