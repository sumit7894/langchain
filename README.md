This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.








    const { file } = req.body;

    // Parse PDF text
    const pdfData = await pdfParse(file.buffer);
    const text = pdfData.text;

    // Create LangChain chain
    const chain = new Chain({ client: openai });

    // Use an appropriate model and prompt for information extraction
    const response = await chain.run(text, {
      model: 'text-davinci-003',
      prompt: `Extract the following information from the text in a tabular format:\n- Key information points\n- Important dates\n- Relevant names and organizations\n- Key takeaways and conclusions`,
    });

    const extractedInfo = JSON.parse(response.data.text);

    res.status(200).json({ extractedInfo });