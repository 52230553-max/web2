function Contact(){
    return(
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">Contact page</h2>
            <form className="flex flex-col gap-3 max-w-md">
              <input
          className="border p-2"
          type="text"
          placeholder="Your Name"
        />

        <input
          className="border p-2"
          type="email"
          placeholder="Your Email"
        />

        <textarea
          className="border p-2"
          placeholder="Your Message"
        ></textarea>

        <button className="bg-blue-600 text-white p-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
export default Contact;