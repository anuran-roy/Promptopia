import React from 'react'
import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section
            className="w-full max-w-full flex-start flex-col"
        >
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world - let your imagination run wild with any AI platform!
            </p>
            <form
                // action=""
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
                onSubmit={handleSubmit}
            >
                <label htmlFor="">
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>

                    <textarea
                        value={post.prompt}
                        id=""
                        cols="30"
                        rows="10"
                        className="form_textarea"
                        placeholder="Write your prompt here"
                        onChange={
                            (e) => setPost({ ...post, prompt: e.target.value })
                        }
                        required
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Field of Prompt{" "}
                        <span className='font-normal'>
                            (#product, #webdevelopment, #idea, etc.)
                        </span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        type='text'
                        placeholder='#tag'
                        required
                        className='form_input'
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary-orange text-sm py-1.5 px-5 rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form