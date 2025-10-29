import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PraticaExtra() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params;
  const scrollRef = useRef(null);
  const [quizLayouts, setQuizLayouts] = useState([]);

  const initialQuiz = Number(params?.initialQuiz) || 1; // Tema inicial
  const currentQuizIndex = initialQuiz - 1;

  // ================== QUIZZES ==================
  const quizzes = [
    {
      title: "O Poder do Consumo Invisível",
      questions: [
        {
          question:
            "1. Qual fator mais determina o impacto ambiental do streaming de vídeos?",
          options: [
            "a) O tamanho da tela do dispositivo usado",
            "b) A qualidade de imagem e o tempo total assistido",
            "c) A quantidade de vídeos armazenados no aplicativo",
          ],
          correct: 1,
          explanation:
            "Quanto maior a resolução e o tempo de reprodução, mais energia os servidores e redes consomem.",
        },
        {
          question:
            "2. Por que o ‘consumo invisível’ é considerado um desafio ambiental moderno?",
          options: [
            "a) Porque a maioria das pessoas não percebe que ações digitais também consomem energia",
            "b) Porque só atividades industriais geram poluição real",
            "c) Porque os dispositivos atuais já compensam automaticamente suas emissões",
          ],
          correct: 0,
          explanation:
            "A invisibilidade do impacto digital faz com que as pessoas subestimem seu consumo energético.",
        },
        {
          question:
            "3. Qual ação realmente reduz o impacto ambiental do uso da internet?",
          options: [
            "a) Diminuir a resolução dos vídeos e baixar conteúdos assistidos com frequência",
            "b) Usar o modo avião durante o streaming",
            "c) Assistir sempre em 4K para evitar buffering",
          ],
          correct: 0,
          explanation:
            "Baixar vídeos evita transmissões repetidas e reduzir a resolução diminui o consumo energético.",
        },
      ],
    },
    {
      title: "Pegada Hídrica e Consumo de Água",
      questions: [
        {
          question: "1. O que significa ‘pegada hídrica’ de um produto?",
          options: [
            "a) A água usada apenas na limpeza do produto",
            "b) Toda a água usada durante produção, transporte e consumo",
            "c) A água utilizada apenas na embalagem",
          ],
          correct: 1,
          explanation:
            "A pegada hídrica envolve toda a água usada ao longo do ciclo de vida do produto.",
        },
        {
          question:
            "2. Qual atitude tem maior impacto para reduzir o consumo de água?",
          options: [
            "a) Tomar banhos mais curtos",
            "b) Diminuir o consumo de carne vermelha",
            "c) Usar sabão biodegradável",
          ],
          correct: 1,
          explanation:
            "A pecuária consome muita água; reduzir carne tem um impacto muito maior do que banhos curtos.",
        },
        {
          question:
            "3. Por que comprar roupas com menos frequência ajuda o meio ambiente?",
          options: [
            "a) Porque evita o consumo de água na produção têxtil",
            "b) Porque roupas novas ocupam mais espaço",
            "c) Porque reduz o lixo reciclável",
          ],
          correct: 0,
          explanation:
            "A indústria têxtil consome grandes volumes de água — cada peça nova tem alto custo hídrico.",
        },
      ],
    },
    {
      title: "A Natureza Dentro de Casa",
      questions: [
        {
          question: "1. Qual o principal benefício de ter plantas em casa?",
          options: [
            "a) Melhoram o ar e o bem-estar dos moradores",
            "b) Servem apenas como decoração",
            "c) Diminuem o espaço útil dos cômodos",
          ],
          correct: 0,
          explanation:
            "Plantas purificam o ar, trazem conforto visual e reduzem o estresse.",
        },
        {
          question: "2. Como o uso da luz natural ajuda o meio ambiente?",
          options: [
            "a) Diminui o uso de energia elétrica",
            "b) Evita a necessidade de janelas grandes",
            "c) Mantém a casa mais quente o tempo todo",
          ],
          correct: 0,
          explanation:
            "Aproveitar luz solar reduz o consumo de eletricidade, diminuindo a pegada de carbono.",
        },
        {
          question: "3. Qual hábito sustentável dentro de casa tem mais impacto?",
          options: [
            "a) Reaproveitar potes e embalagens em vez de jogar fora",
            "b) Comprar sempre produtos novos",
            "c) Usar apenas decoração artificial",
          ],
          correct: 0,
          explanation:
            "Reutilizar materiais evita desperdício, reduz a produção e economiza recursos naturais.",
        },
      ],
    },
  ];

  // Scroll automático até o quiz correto
  useEffect(() => {
    if (
      params?.scrollTo !== undefined &&
      scrollRef.current &&
      quizLayouts[params.scrollTo] !== undefined
    ) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          y: quizLayouts[params.scrollTo],
          animated: true,
        });
      }, 300);
    }
  }, [params, quizLayouts]);

  // ================== COMPONENTE DE CADA QUIZ ==================
  const QuizBlock = ({ quiz, quizIndex }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const question = quiz.questions[currentQuestion];

    // 🔄 Salvar progresso automaticamente
    useEffect(() => {
      const total = quiz.questions.length;
      const progress = (currentQuestion + (showModal ? 1 : 0)) / total;
      const key = `pratica${quizIndex + 1}`;
      AsyncStorage.setItem(key, JSON.stringify(progress)).catch((e) =>
        console.log("Erro ao salvar progresso:", e)
      );
    }, [currentQuestion, showModal]);

    const handleOptionPress = (index) => {
      if (selectedOption !== null) return;
      setSelectedOption(index);
      setShowExplanation(true);
      if (index === question.correct) setScore((prev) => prev + 1);
    };

    const handleNext = () => {
      setSelectedOption(null);
      setShowExplanation(false);
      scrollRef.current?.scrollTo({ y: 0, animated: true });

      if (currentQuestion + 1 < quiz.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowModal(true);
      }
    };

    const handleCloseModal = async () => {
      await AsyncStorage.setItem(`pratica${quizIndex + 1}`, JSON.stringify(0));
      setShowModal(false);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedOption(null);
      setShowExplanation(false);
    };

    return (
      <View style={styles.card}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <Text style={styles.questionText}>{question.question}</Text>

        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = question.correct === index;
          let backgroundColor = "#FFF";

          if (showExplanation) {
            if (isCorrect) backgroundColor = "#C6F6D5";
            else if (isSelected && !isCorrect) backgroundColor = "#FED7D7";
          } else if (isSelected) {
            backgroundColor = "#E0F2E9";
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { backgroundColor }]}
              onPress={() => handleOptionPress(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}

        {showExplanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>
              {selectedOption === question.correct
                ? "✅ Resposta correta!"
                : "❌ Resposta incorreta"}
            </Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentQuestion + 1 < quiz.questions.length
                  ? "Próxima pergunta ➜"
                  : "Finalizar Quiz"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal de Resultado */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>🎉 Quiz Concluído!</Text>
              <Text style={styles.modalText}>
                Você acertou {score} de {quiz.questions.length} perguntas!
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalButtonText}>Refazer Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  // ================== RENDERIZAÇÃO PRINCIPAL ==================
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={24} color="#019314" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContainer}>
        {quizzes.map((quiz, index) => (
          <View
            key={index}
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setQuizLayouts((prev) => {
                const newLayouts = [...prev];
                newLayouts[index] = y;
                return newLayouts;
              });
            }}
          >
            <QuizBlock quiz={quiz} quizIndex={index} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ================== ESTILOS ==================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20, paddingTop: 40 },
  scrollContainer: { paddingBottom: 80 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: "#019314",
    marginLeft: 6,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#019314",
    marginBottom: 16,
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 14,
  },
  optionButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#019314",
    marginVertical: 6,
  },
  optionText: { fontSize: 16, color: "#333" },
  explanationBox: {
    marginTop: 20,
    backgroundColor: "#F0FDF4",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#019314",
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#019314",
    marginBottom: 6,
  },
  explanationText: { fontSize: 15, color: "#333", marginBottom: 12 },
  nextButton: {
    backgroundColor: "#019314",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#019314",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#019314",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
