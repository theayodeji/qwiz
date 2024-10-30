import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const name = searchParams.get('name');
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');
    const count = searchParams.get('count');

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
    const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options for the current question
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option
    const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const categories = {
        'sports': '21',
        'general': '9',
        'science': '17',
        'math': '19',
        'history': '23',
    };

    // Shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fetch the questions based on topic and difficulty
    useEffect(() => {
        let isMounted = true; // Guard to prevent multiple requests
        const fetchQuestions = async () => {
            if (isMounted) {
                setIsLoading(true);
                try {
                    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categories[topic]}&difficulty=${difficulty}&type=multiple&amount=${count}`);
                    const data = await response.json();
                    setQuestions(data.results);
                } catch (error) {
                    setError('Failed to load questions');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchQuestions();

        return () => {
            isMounted = false; // Cleanup to prevent unnecessary re-fetch
        };
    }, []);

    // Shuffle options only once when the current question changes
    useEffect(() => {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            const options = shuffleArray([currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]);
            setShuffledOptions(options); // Set shuffled options in state
        }
    }, [currentQuestionIndex, questions]);

    function decodeHtmlEntities(text) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = text;
        return textarea.value;
    }

    // Handler to move to the next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedOption(null); // Reset selection for the next question
            setIsAnswered(false); // Reset the answer state
        }
    };

    // Handler to select an option
    const handleSelectOption = (option) => {
        if (!isAnswered) {
            setSelectedOption(option); // Set the selected option
            setIsAnswered(true); // Mark the question as answered
        }
    };

    if (isLoading) {
        return (
            <div className='flex space-x-2 justify-center items-center bg-white h-screen '>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='w-screen pt-20 flex items-center flex-col text-center'>
                <h1 className='text-6xl mb-10'>⚠️ {error}</h1>
                <div className='flex gap-2 items-center'>
                    <button className="bg-black rounded-xl px-12 py-4 text-white"
                        onClick={() => {
                            navigate('/')
                        }}
                    >Go back</button>
                    <button className="bg-blue-500 rounded-xl px-12 py-4 text-white"
                        onClick={() => {
                            navigate(0);
                        }}
                    >Try Again</button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className='w-screen pt-20 flex items-center flex-col'>
                <h1 className='text-6xl scale-150 mb-16'>⚠️</h1>
                <div className='text-3xl mb-8'>No questions available for this topic</div>
                    <button className="bg-black rounded-xl px-12 py-4 text-white"
                        onClick={() => {
                            navigate('/')
                        }}
                    >Go back</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold mb-6">Quiz on {topic[0].toUpperCase() + topic.slice(1)} for {name}</h2>

                {/* Display the current question */}
                <div key={currentQuestionIndex} className="mb-6">
                    <h3 className="text-lg font-bold">{decodeHtmlEntities(currentQuestion.question)}</h3>
                    <div className="grid gap-4 mt-2">
                        {shuffledOptions.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelectOption(option)}
                                disabled={isAnswered} // Disable options after the user selects one
                                className={`w-full p-2 rounded-lg transition duration-300 
                                    ${isAnswered ? (
                                        option === currentQuestion.correct_answer
                                            ? 'bg-green-500 text-white' // Highlight correct answer
                                            : option === selectedOption
                                                ? 'bg-red-500 text-white'   // Highlight wrong selected answer
                                                : 'bg-gray-300'             // Disable unselected options
                                    ) : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Show the "Next" button only if the question is answered */}
                {isAnswered && (
                    <div className="mt-6">
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
