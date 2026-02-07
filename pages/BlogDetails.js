import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Linking,
  Alert,
  Platform,
  FlatList,
} from "react-native";
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
import CustomIcon from "../components/CustomIcon";
import { WebView } from 'react-native-webview';


const customHTMLElementModels = {
  font: defaultHTMLElementModels.span.extend({
    contentModel: HTMLContentModel.mixed,
  }),
};

export default function BlogDetails({ route, navigation }) {
  const { blog } = route.params;
  const slug = blog?.slug;

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { width } = useWindowDimensions();
  const BASE_URL = "https://orbitmediasolutions.com/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/blog/${slug}`);
        const json = await response.json();
        // console.log(json.data)
        if (json.success) {
          setApiData(json.data.blog || json.data);
          setRelatedBlogs(json.data.related_blogs || []);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
    else setLoading(false);
  }, [slug]);

  // Function to handle clicking a related blog
  const handleRelatedBlogPress = (item) => {
    navigation.push("BlogDetails", { blog: item });
  };

  const handleOpenURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "URL not supported: " + url);
      }
    } catch (error) {
      console.error("Link Error", error);
    }
  };

  const details = apiData || blog || {};
  const displayTitle = details.blog_title || details.displayTitle || details.banner_title;
  const displayImage = details.banner_image || details.displayImage;
  const displayIntro = details.banner_description;
  const mainContent = details.blog_features || details.htmlContent || "";

  if (loading && !displayTitle) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A3067" />
      </View>
    );
  }

  const tagsStyles = {
    body: { whiteSpace: "normal" },
    p: {
      color: "#444",
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 15,
      textAlign: "justify",
    },
    span: { fontSize: 16, lineHeight: 24 },
    b: { fontWeight: "bold", color: "#1A3067" },
    h2: {
      color: "#1A3067",
      fontSize: 22,
      fontWeight: "800",
      marginTop: 20,
      marginBottom: 10,
    },
  };
// console.log(apiData)


const renderVideo = () => {
  const videoIframe = apiData?.video || blog?.video;
  if (!videoIframe) return null;

  // Extract the YouTube URL to handle it properly
  const match = videoIframe.match(/src=["']([^"']+)["']/);
  const videoSrc = match ? match[1] : null;

  if (!videoSrc) return null;

  const secureVideoSrc = videoSrc.startsWith('//') ? `https:${videoSrc}` : videoSrc;

  if (Platform.OS === "web") {
    return (
      <View style={styles.videoContainer}>
        <Text style={styles.videoLabel}>Experience Our Work</Text>
        <div 
          style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{ 
            __html: videoIframe.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"') 
          }} 
        />
      </View>
    );
  }


  return (
    <View style={styles.videoContainer}>
      <Text style={styles.videoLabel}>Experience Our Work</Text>
      <View style={styles.videoWrapper}>
        <WebView
          key={secureVideoSrc} 
          source={{ 
            uri: secureVideoSrc,
            headers: { 'Referer': 'https://orbitmediasolutions.com' } 
          }}
          style={styles.videoPlayer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          androidLayerType="hardware" 
          playsInline={true} 
        />
      </View>
    </View>
  );
};


  const renderRelatedBlogs = () => {
    if (relatedBlogs.length === 0) return null;

    return (
      <View style={styles.relatedSection}>
        <Text style={styles.videoLabel}>Related Insights</Text>
        <FlatList
          data={relatedBlogs}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.relatedCard}
              onPress={() => handleRelatedBlogPress(item)}
            >
              <Image 
                source={{ uri: `${BASE_URL}${item.banner_image}` }} 
                style={styles.relatedImage} 
              />
              <View style={styles.relatedInfo}>
                <Text numberOfLines={2} style={styles.relatedTitle}>
                  {item.blog_title}
                </Text>
                <Text style={styles.readMore}>Read More →</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <CustomIcon name="arrow-left" size={20} color="white" />
      </TouchableOpacity>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: `${BASE_URL}${displayImage}` }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.contentCard}>
          <Text style={styles.title}>{displayTitle}</Text>
          <View style={styles.accentBar} />

          {displayIntro ? (
            <Text style={styles.introText}>{displayIntro}</Text>
          ) : null}

          <RenderHtml
            contentWidth={width - 40}
            source={{ html: mainContent }}
            tagsStyles={tagsStyles}
            ignoredDomTags={['o:p']}
            renderersProps={{
              a: { onPress: (e, href) => handleOpenURL(href) },
            }}
            customHTMLElementModels={customHTMLElementModels}
          />

          {renderVideo()}
          {renderRelatedBlogs()}

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("Form")}
          >
            <Text style={styles.ctaText}>Enquire About This Solution</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: "rgba(26, 48, 103, 0.7)",
    padding: 12,
    borderRadius: 25,
  },
  heroImage: { width: "100%", height: 280 },
  contentCard: {
    marginTop: -30,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 60,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#1A3067", lineHeight: 30 },
  accentBar: {
    width: 60,
    height: 4,
    backgroundColor: "#1A3067",
    marginVertical: 15,
    borderRadius: 2,
  },
  introText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    fontStyle: "italic",
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#1A3067",
  },

  ctaText: { color: "white", fontWeight: "bold", fontSize: 16 },
  videoContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  videoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A3067",
    marginBottom: 12,
  },
videoWrapper: {
  width: '100%',
  height: 220,
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: '#000',
  elevation: 0, 
},
videoPlayer: {
  width: '100%',
  height: 220,
  backgroundColor: 'transparent',
},

  ctaButton: {
    backgroundColor: "#1A3067",
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(26, 48, 103, 0.3)", 
  },
  relatedSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  relatedCard: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 15,
    elevation: 3,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  relatedImage: {
    width: "100%",
    height: 130,
    backgroundColor: "#f0f0f0",
  },
  relatedInfo: {
    padding: 12,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A3067",
    lineHeight: 18,
    height: 36, 
  },
  readMore: {
    fontSize: 12,
    color: "#1A3067",
    fontWeight: "600",
    marginTop: 8,
  },
});