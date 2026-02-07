import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  ImageBackground,
  Platform,
} from "react-native";
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
import CustomIcon from "../components/CustomIcon";

const customHTMLElementModels = {
  font: defaultHTMLElementModels.span.extend({
    contentModel: HTMLContentModel.mixed,
  }),
};

export default function ServiceDetails({ route, navigation }) {
  const { service } = route.params;
  const slug = service?.slug;

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [faqs, setFaqs] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const scrollRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const BASE_URL = "https://orbitmediasolutions.com/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/services/${slug}`);
        const json = await response.json();

        const faqRes = await fetch(`${BASE_URL}api/faq/index`);
        const faqJson = await faqRes.json();
        console.log(faqJson);
        if (json.success) {
          setApiData(json.data);

          const actualId = json.data.service.id;

          if (faqJson.status && faqJson.data) {
            const filteredFaqs = faqJson.data.filter((item) => {
              return String(item.service_id) === String(actualId);
            });

            console.log(
              `Found ${filteredFaqs.length} FAQs for ID: ${actualId}`,
            );
            setFaqs(filteredFaqs);
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      const node = scrollRef.current;
      if (node.scrollTo) {
        node.scrollTo({ y: 0, animated: true });
      } else if (node.getScrollResponder) {
        node.getScrollResponder().scrollTo({ y: 0, animated: true });
      }
    }
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowTopBtn(offsetY > 400);
  };
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A3067" />
      </View>
    );
  }

  const details = apiData?.service?.itemservices?.[0] || {};
  const featureCards = apiData?.service?.servicefeatures || [];
  const section2Intro =
    details.service_features_section2?.split("<table")[0] || "";
  const sliderImage = apiData?.sliders?.[0]?.image;

  const tagsStyles = {
    h2: {
      color: "#1A3067",
      fontSize: 22,
      fontWeight: "800",
      marginTop: 20,
      marginBottom: 10,
    },
    h3: { color: "#1A3067", fontSize: 18, fontWeight: "700", marginTop: 15 },
    p: { color: "#444", fontSize: 15, lineHeight: 24, marginBottom: 10, textAlign: "justify" },
    blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: "#1A3067",
      paddingLeft: 15,
      fontStyle: "italic",
      marginVertical: 15,
    },
  };

  const overlayTagsStyles = {
    body: { color: "white", textAlign: "center" },
    h2: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "800",
      textAlign: "center",
    },
    p: { color: "#F0F0F0", lineHeight: 22, textAlign: "center" },
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <CustomIcon name="arrow-left" size={20} color="white" />
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        style={styles.container}
      >
        <Image
          source={{ uri: `${BASE_URL}${sliderImage || details.banner_image}` }}
          style={styles.heroImage}
          resizeMode="cover" 
        />
        <View style={styles.contentCard}>
          <Text style={styles.title}>{details.banner_title}</Text>
          <Text style={styles.subtitle}>{details.banner_subtitle}</Text>
          <View style={styles.accentBar} />

          <Image
            source={{ uri: `${BASE_URL}${details.banner_image}` }}
            style={styles.heroImage}
            resizeMode="cover" 
          />
          <Text style={styles.description}>{details.banner_description}</Text>

          {/* Section 1 */}
          {details.service_image_section1 && (
            <Image
              source={{ uri: `${BASE_URL}${details.service_image_section1}` }}
              style={styles.sectionImg}
              resizeMode="cover" // FIX 2
            />
          )}
          <RenderHtml
            contentWidth={width - 40}
            source={{ html: details.service_features }}
            tagsStyles={tagsStyles}
            customHTMLElementModels={customHTMLElementModels} 
          />

          {/* Section 2 */}
          {details.service_image_section2 && (
            <Image
              source={{ uri: `${BASE_URL}${details.service_image_section2}` }}
              style={styles.sectionImg}
              resizeMode="cover" 
            />
          )}
          <RenderHtml
            contentWidth={width - 40}
            source={{ html: section2Intro }}
            tagsStyles={tagsStyles}
            customHTMLElementModels={customHTMLElementModels} 
          />

          {/* Industries Served */}
          <View style={styles.industriesContainer}>
            <RenderHtml
              contentWidth={width - 40}
              source={{ html: details.contain_add }}
              tagsStyles={tagsStyles}
              customHTMLElementModels={customHTMLElementModels} // FIX 1
            />
          </View>

          {/* Section 3 */}
          {details.service_features_section3 &&
          details.service_features_section3.trim().length > 0 ? (
            <View style={styles.backgroundImageWrapper}>
              {details.service_image_section3 &&
              details.service_image_section3.trim().length > 0 ? (
                <ImageBackground
                  source={{
                    uri: `${BASE_URL}${details.service_image_section3}`,
                  }}
                  style={styles.fullSize}
                  resizeMode="cover" // FIX 2
                >
                  <View
                    style={[
                      styles.overlay,
                      { backgroundColor: "rgba(0,0,0,0.6)" },
                    ]}
                  >
                    <RenderHtml
                      contentWidth={width - 60}
                      source={{ html: details.service_features_section3 }}
                      tagsStyles={overlayTagsStyles}
                      customHTMLElementModels={customHTMLElementModels} 
                    />
                  </View>
                </ImageBackground>
              ) : (
                <View
                  style={[
                    styles.overlay,
                    { backgroundColor: "#F8F9FB", paddingVertical: 30 },
                  ]}
                >
                  <RenderHtml
                    contentWidth={width - 60}
                    source={{ html: details.service_features_section3 }}
                    ignoredStyles={["color", "backgroundColor"]}
                    tagsStyles={tagsStyles}
                    customHTMLElementModels={customHTMLElementModels} 
                  />
                </View>
              )}
            </View>
          ) : null}

          {/* Core Features List */}
          {featureCards.length > 0 && (
            <View style={styles.featureSection}>
              <Text style={styles.featureMainTitle}>Core Features</Text>
              {featureCards.map((feature) => (
                <View key={feature.id} style={styles.featureItem}>
                  <View style={styles.featureHeader}>
                    <View style={styles.dot} />
                    <Text style={styles.featureTitle}>
                      {feature.feature_title}
                    </Text>
                  </View>
                  <Text style={styles.featureSubTitle}>
                    {feature.feature_sub_title}
                  </Text>
                  <Text style={styles.featureDescription}>
                    {feature.feature_description}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {/* FAQ SECTION */}
          {faqs.length > 0 && (
            <View style={styles.faqSection}>
              <Text style={styles.featureMainTitle}>
                Frequently Asked Questions
              </Text>
              {faqs.map((faq) => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqHeader}
                    onPress={() => toggleFaq(faq.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.faqQuestion}>{faq.title}</Text>
                    <CustomIcon
                      name={
                        expandedFaq === faq.id
                          ? "chevron-down"
                          : "chevron-right"
                      }
                      size={14}
                      color="#1A3067"
                    />
                  </TouchableOpacity>

                  {expandedFaq === faq.id && (
                    <View style={styles.faqAnswerContainer}>
                      <Text style={styles.faqAnswer}>{faq.description}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("Form")}
          >
            <Text style={styles.ctaText}>Get Your Service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* {showTopBtn && (
        <View style={styles.buttonContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.scrollTopButton}
            onPress={() => {
              console.log("Button Pressed!");
              scrollToTop();
            }}
            activeOpacity={0.7}
          >
            <CustomIcon name="chevron-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1 },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
  },
  heroImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },
  contentCard: {
    marginTop: -35,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    paddingBottom: 100,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px -5px 10px rgba(0,0,0,0.1)",
      },
    }),
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#1A3067" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 8, lineHeight: 20 },
  accentBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#1A3067",
    marginVertical: 20,
    borderRadius: 2,
  },
  description: { fontSize: 16, color: "#444", lineHeight: 26, marginTop: 10 },
  sectionImg: {
    width: "100%",
    height: 350,
    borderRadius: 15,
    marginVertical: 20,
  },
  industriesContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F8F9FB",
    borderRadius: 15,
  },
  ctaButton: {
    backgroundColor: "#1A3067",
    padding: 20,
    borderRadius: 15,
    marginTop: 40,
    alignItems: "center",
  },
  ctaText: { color: "white", fontWeight: "bold", fontSize: 18 },
  backgroundImageWrapper: {
    width: "100%",
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    minHeight: 250,
  },
  fullSize: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  featureSection: { marginTop: 30, paddingVertical: 10 },
  featureMainTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A3067",
    marginBottom: 20,
  },
  featureItem: {
    backgroundColor: "#F9FBFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1A3067",
    marginRight: 10,
  },
  featureTitle: { fontSize: 16, fontWeight: "bold", color: "#1A3067" },
  featureSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  featureDescription: { fontSize: 14, color: "#666", lineHeight: 20 },
  faqSection: { marginTop: 40 },
  faqItem: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E1E8F5",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FBFF",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1A3067",
    paddingRight: 10,
  },
  faqAnswerContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E1E8F5",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  featureMainTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A3067",
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Only take up space at the bottom
    right: 20, // Only take up space at the right
    zIndex: 9999,
    elevation: 15, // Essential for Android
  },
  scrollTopButton: {
    backgroundColor: "#1A3067",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    // Shadow for Android
    elevation: 15,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
});
